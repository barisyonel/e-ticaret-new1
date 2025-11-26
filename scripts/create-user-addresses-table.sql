-- User Addresses Table
-- Kullanıcıların teslimat adreslerini saklar

USE sitenhaz_sitenhazirDb;
GO

-- User Addresses Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_addresses')
BEGIN
    CREATE TABLE user_addresses (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        title NVARCHAR(50) NOT NULL, -- "Ev", "İş", "Diğer" gibi
        full_name NVARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address NVARCHAR(MAX) NOT NULL,
        city NVARCHAR(100) NOT NULL,
        district NVARCHAR(100) NOT NULL,
        postal_code VARCHAR(10) NOT NULL,
        country NVARCHAR(100) NOT NULL DEFAULT 'Türkiye',
        is_default BIT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        
        -- Foreign key constraint
        CONSTRAINT FK_user_addresses_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    
    -- Indexes
    CREATE INDEX IX_user_addresses_user_id ON user_addresses(user_id);
    CREATE INDEX IX_user_addresses_is_default ON user_addresses(user_id, is_default);
    
    PRINT '✅ user_addresses table created successfully';
END
ELSE
BEGIN
    PRINT 'ℹ️  user_addresses table already exists';
END
GO

-- Ensure only one default address per user (trigger)
IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'TR_user_addresses_default_unique')
BEGIN
    EXEC('
    CREATE TRIGGER TR_user_addresses_default_unique
    ON user_addresses
    AFTER INSERT, UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        
        -- If a new default address is set, unset others for the same user
        IF EXISTS (SELECT 1 FROM inserted WHERE is_default = 1)
        BEGIN
            UPDATE ua
            SET is_default = 0
            FROM user_addresses ua
            INNER JOIN inserted i ON ua.user_id = i.user_id
            WHERE ua.id != i.id AND ua.is_default = 1 AND i.is_default = 1;
        END
    END
    ');
    
    PRINT '✅ Default address trigger created';
END
ELSE
BEGIN
    PRINT 'ℹ️  Default address trigger already exists';
END
GO

PRINT '🎯 User addresses table setup completed';
