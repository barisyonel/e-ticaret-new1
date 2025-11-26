-- Notifications Table
-- Kullanıcı bildirimlerini saklar

USE sitenhaz_sitenhazirDb;
GO

-- Notifications Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'notifications')
BEGIN
    CREATE TABLE notifications (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('ORDER', 'PAYMENT', 'SHIPPING', 'PROMOTION', 'SYSTEM')),
        title NVARCHAR(255) NOT NULL,
        message NVARCHAR(MAX) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'UNREAD' CHECK (status IN ('UNREAD', 'READ', 'ARCHIVED')),
        related_id INT NULL, -- Order ID, Product ID, etc.
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        read_at DATETIME2 NULL,
        
        -- Foreign key constraint
        CONSTRAINT FK_notifications_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    
    -- Indexes
    CREATE INDEX IX_notifications_user_id ON notifications(user_id);
    CREATE INDEX IX_notifications_status ON notifications(user_id, status);
    CREATE INDEX IX_notifications_type ON notifications(type);
    CREATE INDEX IX_notifications_created_at ON notifications(created_at DESC);
    CREATE INDEX IX_notifications_related_id ON notifications(related_id);
    
    PRINT '✅ notifications table created successfully';
END
ELSE
BEGIN
    PRINT 'ℹ️  notifications table already exists';
END
GO

PRINT '🎯 Notifications table setup completed';
