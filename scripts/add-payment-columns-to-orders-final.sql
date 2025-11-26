-- Add payment columns to orders table for iyzico integration
-- Bu script orders tablosuna ödeme ile ilgili kolonları ekler

USE sitenhaz_sitenhazirDb;
GO

-- payment_status kolonu ekle
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.orders') AND name = 'payment_status')
BEGIN
    ALTER TABLE dbo.orders ADD payment_status VARCHAR(50) NULL DEFAULT 'PENDING';
    PRINT '✅ orders.payment_status column added';
END
ELSE
BEGIN
    PRINT 'ℹ️  orders.payment_status column already exists';
END
GO

-- iyzico_payment_id kolonu ekle
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.orders') AND name = 'iyzico_payment_id')
BEGIN
    ALTER TABLE dbo.orders ADD iyzico_payment_id VARCHAR(255) NULL;
    PRINT '✅ orders.iyzico_payment_id column added';
END
ELSE
BEGIN
    PRINT 'ℹ️  orders.iyzico_payment_id column already exists';
END
GO

-- payment_error_message kolonu ekle
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.orders') AND name = 'payment_error_message')
BEGIN
    ALTER TABLE dbo.orders ADD payment_error_message NVARCHAR(MAX) NULL;
    PRINT '✅ orders.payment_error_message column added';
END
ELSE
BEGIN
    PRINT 'ℹ️  orders.payment_error_message column already exists';
END
GO

-- Mevcut siparişlerin payment_status'unu güncelle
UPDATE orders 
SET payment_status = 'SUCCESS' 
WHERE payment_status IS NULL AND status IN ('CONFIRMED', 'SHIPPED', 'DELIVERED');

UPDATE orders 
SET payment_status = 'PENDING' 
WHERE payment_status IS NULL AND status = 'PENDING';

PRINT '✅ Existing orders payment status updated';
GO

PRINT '🎯 Payment columns setup completed for iyzico integration';
