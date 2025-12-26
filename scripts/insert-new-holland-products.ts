/**
 * New Holland Yedek Parça Ürünleri Ekleme Script'i
 * Bu script, New Holland yedek parçaları için 20 random ürün ekler
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';
import sql from 'mssql';
import { generateSlug } from '../lib/utils/slug';

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

// New Holland yedek parça ürünleri
const NEW_HOLLAND_PRODUCTS = [
  {
    name: 'New Holland Motor Yağı Filtresi',
    description: 'Orijinal New Holland motor yağı filtresi. Yüksek kaliteli filtreleme sağlar ve motorunuzun ömrünü uzatır.',
    price: 125.50,
    stock: 45,
  },
  {
    name: 'New Holland Hava Filtresi',
    description: 'Orijinal New Holland hava filtresi. Motorunuzun temiz hava almasını sağlar ve performansı artırır.',
    price: 89.90,
    stock: 32,
  },
  {
    name: 'New Holland Yakıt Filtresi',
    description: 'Orijinal New Holland yakıt filtresi. Yakıt sisteminizi korur ve motor performansını optimize eder.',
    price: 75.00,
    stock: 28,
  },
  {
    name: 'New Holland Hidrolik Yağ Filtresi',
    description: 'Orijinal New Holland hidrolik yağ filtresi. Hidrolik sisteminizin verimli çalışmasını sağlar.',
    price: 145.00,
    stock: 20,
  },
  {
    name: 'New Holland V Kayışı',
    description: 'Orijinal New Holland V kayışı. Dayanıklı ve yüksek performanslı kayış.',
    price: 65.00,
    stock: 50,
  },
  {
    name: 'New Holland Alternatör',
    description: 'Orijinal New Holland alternatör. Elektrik sisteminizin güvenilir çalışmasını sağlar.',
    price: 1250.00,
    stock: 8,
  },
  {
    name: 'New Holland Marş Motoru',
    description: 'Orijinal New Holland marş motoru. Güçlü ve dayanıklı marş sistemi.',
    price: 980.00,
    stock: 12,
  },
  {
    name: 'New Holland Fren Balata Seti',
    description: 'Orijinal New Holland fren balata seti. Güvenli frenleme için yüksek kaliteli balata.',
    price: 185.00,
    stock: 25,
  },
  {
    name: 'New Holland Radyatör',
    description: 'Orijinal New Holland radyatör. Motor soğutma sisteminiz için ideal çözüm.',
    price: 450.00,
    stock: 15,
  },
  {
    name: 'New Holland Su Pompası',
    description: 'Orijinal New Holland su pompası. Soğutma sisteminizin verimli çalışmasını sağlar.',
    price: 320.00,
    stock: 18,
  },
  {
    name: 'New Holland Termostat',
    description: 'Orijinal New Holland termostat. Motor sıcaklığını optimum seviyede tutar.',
    price: 45.00,
    stock: 60,
  },
  {
    name: 'New Holland Bujiler Seti',
    description: 'Orijinal New Holland bujiler seti. Motorunuzun düzgün çalışması için gerekli.',
    price: 95.00,
    stock: 40,
  },
  {
    name: 'New Holland Distribütör Kapağı',
    description: 'Orijinal New Holland distribütör kapağı. Elektrik sisteminizin korunması için.',
    price: 125.00,
    stock: 22,
  },
  {
    name: 'New Holland Amortisör',
    description: 'Orijinal New Holland amortisör. Sürüş konforu ve güvenliği için.',
    price: 280.00,
    stock: 16,
  },
  {
    name: 'New Holland Direksiyon Pompası',
    description: 'Orijinal New Holland direksiyon pompası. Kolay ve hassas direksiyon kontrolü.',
    price: 550.00,
    stock: 10,
  },
  {
    name: 'New Holland Hidrolik Pompa',
    description: 'Orijinal New Holland hidrolik pompa. Hidrolik sisteminizin güçlü çalışması için.',
    price: 1250.00,
    stock: 7,
  },
  {
    name: 'New Holland Farlar Seti',
    description: 'Orijinal New Holland farlar seti. Güçlü ve dayanıklı aydınlatma sistemi.',
    price: 195.00,
    stock: 30,
  },
  {
    name: 'New Holland Akü',
    description: 'Orijinal New Holland akü. Güçlü ve uzun ömürlü akü çözümü.',
    price: 450.00,
    stock: 14,
  },
  {
    name: 'New Holland Lastik (Ön)',
    description: 'Orijinal New Holland ön lastik. Dayanıklı ve yüksek performanslı lastik.',
    price: 850.00,
    stock: 9,
  },
  {
    name: 'New Holland Lastik (Arka)',
    description: 'Orijinal New Holland arka lastik. Güçlü çekiş ve dayanıklılık için.',
    price: 1200.00,
    stock: 6,
  },
];

async function insertNewHollandProducts() {
  let pool: any = null;

  try {
    console.log('🚀 New Holland ürünleri ekleniyor...\n');

    // Connect to database
    pool = await getConnection();
    console.log('✅ Veritabanına bağlanıldı\n');

    let addedCount = 0;
    let skippedCount = 0;

    for (const product of NEW_HOLLAND_PRODUCTS) {
      const slug = generateSlug(product.name);

      // Check if product already exists
      const checkRequest = pool.request();
      checkRequest.input('slug', sql.NVarChar, slug);
      const existingResult = await checkRequest.query(
        `SELECT id FROM products WHERE slug = @slug`
      );

      if (existingResult.recordset.length > 0) {
        console.log(`⏭️  "${product.name}" zaten mevcut, atlanıyor`);
        skippedCount++;
        continue;
      }

      // Insert product
      const insertRequest = pool.request();
      insertRequest.input('name', sql.NVarChar, product.name);
      insertRequest.input('slug', sql.NVarChar, slug);
      insertRequest.input('description', sql.NVarChar, product.description);
      insertRequest.input('price', sql.Decimal(18, 2), product.price);
      insertRequest.input('stock', sql.Int, product.stock);
      insertRequest.input('images', sql.NVarChar, null); // JSON array as string, null for now
      insertRequest.input('isActive', sql.Bit, 1);

      // Try to insert with is_active column
      try {
        await insertRequest.query(
          `INSERT INTO products (name, slug, description, price, stock, images, is_active, created_at, updated_at)
           VALUES (@name, @slug, @description, @price, @stock, @images, @isActive, GETDATE(), GETDATE())`
        );
      } catch (error: any) {
        // If is_active column doesn't exist (error 207), insert without it
        if (error?.number === 207) {
          const insertRequest2 = pool.request();
          insertRequest2.input('name', sql.NVarChar, product.name);
          insertRequest2.input('slug', sql.NVarChar, slug);
          insertRequest2.input('description', sql.NVarChar, product.description);
          insertRequest2.input('price', sql.Decimal(18, 2), product.price);
          insertRequest2.input('stock', sql.Int, product.stock);
          insertRequest2.input('images', sql.NVarChar, null);
          await insertRequest2.query(
            `INSERT INTO products (name, slug, description, price, stock, images, created_at, updated_at)
             VALUES (@name, @slug, @description, @price, @stock, @images, GETDATE(), GETDATE())`
          );
        } else {
          throw error;
        }
      }

      console.log(`✓ "${product.name}" eklendi`);
      addedCount++;
    }

    console.log('\n========================================');
    console.log('✅ İşlem tamamlandı!');
    console.log(`📊 Yeni eklenen: ${addedCount} ürün`);
    console.log(`⏭️  Atlanan: ${skippedCount} ürün`);
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
  insertNewHollandProducts()
    .then(() => {
      console.log('✅ Script başarıyla tamamlandı');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script hatası:', error);
      process.exit(1);
    });
}

export { insertNewHollandProducts };

