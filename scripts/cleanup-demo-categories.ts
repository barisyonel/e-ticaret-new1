/**
 * Demo/Deneme Kategorilerini Temizleme ve Ürünleri Yeni Kategorilere Taşıma Script'i
 * Bu script:
 * 1. "deneme" kategorilerine bağlı ürünleri bulur
 * 2. Bu ürünleri yeni profesyonel kategorilere taşır
 * 3. Tüm "deneme" referanslarını temizler
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';
import sql from 'mssql';

// Load .env.local file FIRST, before any other imports
const envPath = resolve(process.cwd(), '.env.local');
if (!existsSync(envPath)) {
  console.error('❌ .env.local dosyası bulunamadı!');
  process.exit(1);
}

const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('❌ .env.local dosyası yüklenirken hata:', result.error);
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable bulunamadı!');
  process.exit(1);
}

// Parse DATABASE_URL
function parseDatabaseUrl() {
  const dbUrl = process.env.DATABASE_URL!;
  
  if (dbUrl.includes('Server=') && !dbUrl.includes('Data Source=')) {
    const parts = dbUrl.split(';').filter(p => p.trim());
    const config: any = {
      server: 'localhost',
      database: '',
      options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        trustedConnection: false,
      },
    };

    for (const part of parts) {
      const [key, ...valueParts] = part.split('=');
      const value = valueParts.join('=').trim();
      const keyLower = key.trim().toLowerCase();

      if (keyLower === 'server') {
        const serverValue = value.replace(/\\\\/g, '\\').trim();
        if (serverValue.includes('\\')) {
          const parts = serverValue.split('\\');
          if (parts.length === 2) {
            config.server = parts[0] === 'localhost' ? 'localhost' : parts[0];
            config.options.instanceName = parts[1];
          } else {
            config.server = serverValue;
          }
        } else {
          config.server = serverValue;
        }
      } else if (keyLower === 'database') {
        config.database = value;
      } else if (keyLower === 'user id' || keyLower === 'uid') {
        config.user = value;
      } else if (keyLower === 'password' || keyLower === 'pwd') {
        config.password = value;
      } else if (keyLower === 'encrypt') {
        config.options.encrypt = value.toLowerCase() === 'true' || value.toLowerCase() === 'yes';
      } else if (keyLower === 'trustservercertificate' || keyLower === 'trust server certificate') {
        config.options.trustServerCertificate = value.toLowerCase() === 'true' || value.toLowerCase() === 'yes';
      }
    }

    return config;
  }

  throw new Error('DATABASE_URL formatı desteklenmiyor');
}

async function getConnection() {
  const dbConfig = parseDatabaseUrl();
  const isNamedInstance = dbConfig.options?.instanceName && dbConfig.options?.instanceName !== 'MSSQLLocalDB';
  
  const sqlConfig: any = {
    server: dbConfig.server,
    database: dbConfig.database,
    user: dbConfig.user || undefined,
    password: dbConfig.password || undefined,
    connectionTimeout: 30000,
    requestTimeout: 30000,
    options: {
      encrypt: dbConfig.options?.encrypt || false,
      trustServerCertificate: dbConfig.options?.trustServerCertificate ?? true,
      enableArithAbort: true,
      trustedConnection: dbConfig.options?.trustedConnection ?? false,
      instanceName: dbConfig.options?.instanceName || undefined,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
      acquireTimeoutMillis: 30000,
    },
  };

  if (isNamedInstance && !dbConfig.port) {
    sqlConfig.port = undefined;
  } else if (dbConfig.port) {
    sqlConfig.port = dbConfig.port;
  } else {
    sqlConfig.port = 1433;
  }

  return await sql.connect(sqlConfig);
}

async function cleanupDemoCategories() {
  let pool: any = null;
  
  try {
    console.log('🧹 Demo/Deneme kategorileri temizleniyor...\n');

    // Connect to database
    pool = await getConnection();
    console.log('✅ Veritabanına bağlanıldı\n');

    // 1. Yeni profesyonel kategorileri al
    console.log('📋 Yeni profesyonel kategoriler alınıyor...');
    const categoriesRequest = pool.request();
    const categoriesResult = await categoriesRequest.query(
      `SELECT id, name, slug FROM categories 
       WHERE parent_id IS NULL 
       AND is_active = 1 
       AND LOWER(name) NOT LIKE '%deneme%'
       ORDER BY display_order, name`
    );
    
    const professionalCategories = categoriesResult.recordset;
    console.log(`✓ ${professionalCategories.length} profesyonel kategori bulundu\n`);

    if (professionalCategories.length === 0) {
      console.log('⚠️  Hiç profesyonel kategori bulunamadı! Önce kategorileri ekleyin.');
      return;
    }

    // 2. "deneme" kategorilerini bul
    console.log('🔍 "deneme" kategorileri bulunuyor...');
    const demoCategoriesRequest = pool.request();
    const demoCategoriesResult = await demoCategoriesRequest.query(
      `SELECT id, name FROM categories 
       WHERE LOWER(name) LIKE '%deneme%'`
    );
    
    const demoCategories = demoCategoriesResult.recordset;
    console.log(`✓ ${demoCategories.length} adet "deneme" kategorisi bulundu\n`);

    if (demoCategories.length === 0) {
      console.log('✅ Hiç "deneme" kategorisi bulunamadı. Temizlik gerekmiyor.');
      return;
    }

    // 3. "deneme" kategorilerine bağlı ürünleri bul ve yeni kategorilere taşı
    console.log('🔄 Ürünler yeni kategorilere taşınıyor...\n');
    let movedProducts = 0;
    let defaultCategoryId = professionalCategories[0].id; // İlk kategoriyi varsayılan olarak kullan

    for (const demoCategory of demoCategories) {
      // Bu kategoriye bağlı ürünleri bul
      const productsRequest = pool.request();
      productsRequest.input('categoryId', sql.Int, demoCategory.id);
      const productsResult = await productsRequest.query(
        `SELECT DISTINCT p.id, p.name, p.primary_category_id
         FROM products p
         LEFT JOIN product_categories pc ON p.id = pc.product_id
         WHERE (p.primary_category_id = @categoryId OR pc.category_id = @categoryId)
         AND p.is_active = 1`
      );

      const products = productsResult.recordset;
      
      if (products.length === 0) {
        console.log(`⏭️  "${demoCategory.name}" kategorisine bağlı ürün yok`);
        continue;
      }

      console.log(`📦 "${demoCategory.name}" kategorisinde ${products.length} ürün bulundu`);

      // Her ürünü yeni bir kategoriye taşı
      for (const product of products) {
        // Ürünün adına göre kategori seç (basit bir eşleştirme)
        let targetCategoryId = defaultCategoryId;
        
        const productNameLower = product.name.toLowerCase();
        
        // Kategori eşleştirme mantığı
        if (productNameLower.includes('motor') || productNameLower.includes('piston') || productNameLower.includes('silindir')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'motor-parcalari');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('şanzıman') || productNameLower.includes('vites') || productNameLower.includes('transmisyon')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'sanziman-parcalari');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('hidrolik') || productNameLower.includes('pompa')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'hidrolik-sistem-parcalari');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('elektrik') || productNameLower.includes('kablo') || productNameLower.includes('bobin')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'elektrik-parcalari');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('fren') || productNameLower.includes('disk') || productNameLower.includes('balata')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'fren-sistemi-parcalari');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('lastik') || productNameLower.includes('jant') || productNameLower.includes('tekerlek')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'lastik-ve-jant');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('filtre')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'filtreler');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('yağ') || productNameLower.includes('sıvı') || productNameLower.includes('akışkan')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'yaglar-ve-sivilar');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('kaporta') || productNameLower.includes('çamurluk') || productNameLower.includes('kapı')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'kaporta-parcalari');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('soğutma') || productNameLower.includes('radyatör') || productNameLower.includes('fan')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'sogutma-sistemi-parcalari');
          if (cat) targetCategoryId = cat.id;
        } else if (productNameLower.includes('yakıt') || productNameLower.includes('benzin') || productNameLower.includes('mazot')) {
          const cat = professionalCategories.find((c: any) => c.slug === 'yakit-sistemi-parcalari');
          if (cat) targetCategoryId = cat.id;
        }

        // primary_category_id'yi güncelle
        const updatePrimaryRequest = pool.request();
        updatePrimaryRequest.input('productId', sql.Int, product.id);
        updatePrimaryRequest.input('newCategoryId', sql.Int, targetCategoryId);
        await updatePrimaryRequest.query(
          `UPDATE products 
           SET primary_category_id = @newCategoryId, updated_at = GETDATE()
           WHERE id = @productId`
        );

        // product_categories tablosundan eski kategoriyi kaldır
        const removeOldRequest = pool.request();
        removeOldRequest.input('productId', sql.Int, product.id);
        removeOldRequest.input('oldCategoryId', sql.Int, demoCategory.id);
        await removeOldRequest.query(
          `DELETE FROM product_categories 
           WHERE product_id = @productId AND category_id = @oldCategoryId`
        );

        // Yeni kategoriyi ekle (eğer yoksa)
        const addNewRequest = pool.request();
        addNewRequest.input('productId', sql.Int, product.id);
        addNewRequest.input('newCategoryId', sql.Int, targetCategoryId);
        try {
          await addNewRequest.query(
            `INSERT INTO product_categories (product_id, category_id)
             VALUES (@productId, @newCategoryId)`
          );
        } catch (e: any) {
          // Zaten varsa hata verme (duplicate key)
          if (e.number !== 2627) throw e;
        }

        movedProducts++;
      }

      console.log(`✓ ${products.length} ürün yeni kategorilere taşındı\n`);
    }

    // 4. "deneme" kategorilerini pasif yap (silme yerine, ürün referansları olabilir)
    console.log('🔕 "deneme" kategorileri pasif yapılıyor...');
    const deactivateRequest = pool.request();
    const deactivateResult = await deactivateRequest.query(
      `UPDATE categories 
       SET is_active = 0, updated_at = GETDATE()
       WHERE LOWER(name) LIKE '%deneme%'`
    );
    console.log(`✓ ${deactivateResult.rowsAffected[0] || 0} adet "deneme" kategorisi pasif yapıldı`);

    console.log('\n========================================');
    console.log('✅ Temizlik tamamlandı!');
    console.log(`📊 Taşınan ürün sayısı: ${movedProducts}`);
    console.log(`🔕 Pasif yapılan kategori: ${deactivateResult.rowsAffected[0] || 0}`);
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Hata:', error);
    throw error;
  } finally {
    if (pool) {
      await pool.close();
      console.log('✅ Veritabanı bağlantısı kapatıldı');
    }
  }
}

// Script'i çalıştır
if (require.main === module) {
  cleanupDemoCategories()
    .then(() => {
      console.log('✅ Script başarıyla tamamlandı');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script hatası:', error);
      process.exit(1);
    });
}

export { cleanupDemoCategories };





