/**
 * New Holland Yedek Parça Kategorileri Ekleme Script'i
 * Bu script, "deneme" kategorilerini siler ve gerçek New Holland kategorilerini ekler
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';
import sql from 'mssql';

// Load .env.local file FIRST, before any other imports
const envPath = resolve(process.cwd(), '.env.local');
if (!existsSync(envPath)) {
  console.error('❌ .env.local dosyası bulunamadı!');
  console.error(`   Beklenen konum: ${envPath}`);
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

const IMAGE_URL = 'https://res.cloudinary.com/dkmmkfbjv/image/upload/v1763066681/auraguzellikmerkezi/categories/noksqiygt1uei96seqwc.jpg';

// Gerçek New Holland kategorileri
const NEW_HOLLAND_CATEGORIES = [
  { name: 'Motor Parçaları', slug: 'motor-parcalari', order: 1 },
  { name: 'Şanzıman Parçaları', slug: 'sanziman-parcalari', order: 2 },
  { name: 'Hidrolik Sistem Parçaları', slug: 'hidrolik-sistem-parcalari', order: 3 },
  { name: 'Elektrik Parçaları', slug: 'elektrik-parcalari', order: 4 },
  { name: 'Fren Sistemi Parçaları', slug: 'fren-sistemi-parcalari', order: 5 },
  { name: 'Lastik ve Jant', slug: 'lastik-ve-jant', order: 6 },
  { name: 'Aydınlatma Parçaları', slug: 'aydinlatma-parcalari', order: 7 },
  { name: 'Filtreler', slug: 'filtreler', order: 8 },
  { name: 'Yağlar ve Sıvılar', slug: 'yaglar-ve-sivilar', order: 9 },
  { name: 'Kaporta Parçaları', slug: 'kaporta-parcalari', order: 10 },
  { name: 'Soğutma Sistemi Parçaları', slug: 'sogutma-sistemi-parcalari', order: 11 },
  { name: 'Yakıt Sistemi Parçaları', slug: 'yakit-sistemi-parcalari', order: 12 },
  { name: 'Radyatör ve Soğutucu Parçaları', slug: 'radyator-ve-sogutucu-parcalari', order: 13 },
  { name: 'Aksesuarlar', slug: 'aksesuarlar', order: 14 },
  { name: 'Yedek Parça Setleri', slug: 'yedek-parca-setleri', order: 15 },
];

async function insertNewHollandCategories() {
  let pool: any = null;
  
  try {
    console.log('🚀 New Holland kategorileri ekleniyor...\n');

    // Connect to database
    pool = await getConnection();
    console.log('✅ Veritabanına bağlanıldı\n');

    // 1. "deneme" içeren kategorileri pasif yap (silme yerine, ürün referansları olduğu için)
    console.log('🔕 "deneme" içeren kategoriler pasif yapılıyor...');
    
    const deactivateRequest = pool.request();
    const deactivateResult = await deactivateRequest.query(
      `UPDATE categories 
       SET is_active = 0, updated_at = GETDATE()
       WHERE LOWER(name) LIKE '%deneme%'`
    );
    console.log(`✓ ${deactivateResult.rowsAffected[0] || 0} adet "deneme" kategorisi pasif yapıldı`);

    // 2. Gerçek kategorileri ANA KATEGORİ olarak ekle (parent_id = NULL)
    console.log('\n📦 Gerçek kategoriler ana kategori olarak ekleniyor...\n');
    let addedCount = 0;
    let skippedCount = 0;
    let updatedCount = 0;

    for (const category of NEW_HOLLAND_CATEGORIES) {
      // Kategori zaten var mı kontrol et
      const checkRequest = pool.request();
      checkRequest.input('slug', sql.NVarChar, category.slug);
      const existingResult = await checkRequest.query(
        `SELECT id, parent_id FROM categories WHERE slug = @slug`
      );

      if (existingResult.recordset.length > 0) {
        const existing = existingResult.recordset[0];
        // Eğer kategori var ama alt kategori ise, ana kategori yap
        if (existing.parent_id !== null) {
          const updateRequest = pool.request();
          updateRequest.input('id', sql.Int, existing.id);
          updateRequest.input('displayOrder', sql.Int, category.order);
          await updateRequest.query(
            `UPDATE categories 
             SET parent_id = NULL, display_order = @displayOrder, updated_at = GETDATE()
             WHERE id = @id`
          );
          console.log(`🔄 "${category.name}" ana kategori yapıldı`);
          updatedCount++;
        } else {
          console.log(`⏭️  "${category.name}" zaten mevcut, atlanıyor`);
          skippedCount++;
        }
        continue;
      }

      // Kategoriyi ANA KATEGORİ olarak ekle (parent_id = NULL)
      const insertRequest = pool.request();
      insertRequest.input('name', sql.NVarChar, category.name);
      insertRequest.input('slug', sql.NVarChar, category.slug);
      insertRequest.input('image', sql.NVarChar, IMAGE_URL);
      insertRequest.input('displayOrder', sql.Int, category.order);
      
      await insertRequest.query(
        `INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
         VALUES (@name, @slug, NULL, @image, @displayOrder, 1, GETDATE(), GETDATE())`
      );

      console.log(`✓ "${category.name}" ana kategori olarak eklendi`);
      addedCount++;
    }

    console.log('\n========================================');
    console.log('✅ İşlem tamamlandı!');
    console.log(`📊 Yeni eklenen: ${addedCount} kategori`);
    console.log(`🔄 Güncellenen: ${updatedCount} kategori`);
    console.log(`⏭️  Atlanan: ${skippedCount} kategori`);
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
  insertNewHollandCategories()
    .then(() => {
      console.log('✅ Script başarıyla tamamlandı');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script hatası:', error);
      process.exit(1);
    });
}

export { insertNewHollandCategories };
