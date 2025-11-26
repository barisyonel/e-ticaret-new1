import { executeNonQuery } from '../lib/db';

async function addPaymentColumns() {
  console.log('📦 Adding payment columns to orders table...');

  try {
    // Check if payment_status column exists
    const checkStatusQuery = `
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_status'
    `;
    
    // Add payment_status column if it doesn't exist
    await executeNonQuery(`
      IF NOT EXISTS (
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_status'
      )
      BEGIN
        ALTER TABLE orders 
        ADD payment_status VARCHAR(50) NULL DEFAULT 'PENDING';
        PRINT '✅ payment_status column added';
      END
      ELSE
      BEGIN
        PRINT 'ℹ️  payment_status column already exists';
      END
    `);

    // Add iyzico_payment_id column if it doesn't exist
    await executeNonQuery(`
      IF NOT EXISTS (
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'iyzico_payment_id'
      )
      BEGIN
        ALTER TABLE orders 
        ADD iyzico_payment_id VARCHAR(255) NULL;
        PRINT '✅ iyzico_payment_id column added';
      END
      ELSE
      BEGIN
        PRINT 'ℹ️  iyzico_payment_id column already exists';
      END
    `);

    // Add payment_error_message column if it doesn't exist
    await executeNonQuery(`
      IF NOT EXISTS (
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_error_message'
      )
      BEGIN
        ALTER TABLE orders 
        ADD payment_error_message NVARCHAR(MAX) NULL;
        PRINT '✅ payment_error_message column added';
      END
      ELSE
      BEGIN
        PRINT 'ℹ️  payment_error_message column already exists';
      END
    `);

    console.log('✅ Payment columns added successfully');
  } catch (error: any) {
    console.error('❌ Error adding payment columns:', error.message);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  addPaymentColumns()
    .then(() => {
      console.log('✅ Migration completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration failed:', error);
      process.exit(1);
    });
}

export default addPaymentColumns;

