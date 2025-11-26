-- Add payment columns to orders table

-- Add payment_status column if it doesn't exist
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
GO

-- Add iyzico_payment_id column if it doesn't exist
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
GO

-- Add payment_error_message column if it doesn't exist
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
GO

