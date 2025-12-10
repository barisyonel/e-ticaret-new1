-- NEW HOLLAND YEDEK PARÇA Kategorileri - Gerçek Kategoriler
-- Bu script, New Holland traktör yedek parça kategorilerini ekler
-- "deneme" kategorilerinin yerine gerçek kategoriler eklenir

DECLARE @ImageUrl NVARCHAR(500) = 'https://res.cloudinary.com/dkmmkfbjv/image/upload/v1763066681/auraguzellikmerkezi/categories/noksqiygt1uei96seqwc.jpg';
DECLARE @MainCategoryId INT;

-- Ana kategori ID'sini al (NEW HOLLAND YEDEK PARÇA)
IF EXISTS (SELECT 1 FROM categories WHERE slug = 'new-holland-yedek-parca')
BEGIN
    SET @MainCategoryId = (SELECT id FROM categories WHERE slug = 'new-holland-yedek-parca');
END
ELSE
BEGIN
    -- Ana kategori yoksa oluştur
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('NEW HOLLAND YEDEK PARÇA', 'new-holland-yedek-parca', NULL, @ImageUrl, 0, 1, GETDATE(), GETDATE());
    SET @MainCategoryId = SCOPE_IDENTITY();
END

PRINT 'Ana kategori ID: ' + CAST(@MainCategoryId AS NVARCHAR(10));

-- ============================================
-- Ana Kategoriler (Parent Categories)
-- ============================================

-- 1. Motor Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'motor-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Motor Parçaları', 'motor-parcalari', @MainCategoryId, @ImageUrl, 1, 1, GETDATE(), GETDATE());
    PRINT '✓ Motor Parçaları eklendi';
END

-- 2. Şanzıman Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'sanziman-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Şanzıman Parçaları', 'sanziman-parcalari', @MainCategoryId, @ImageUrl, 2, 1, GETDATE(), GETDATE());
    PRINT '✓ Şanzıman Parçaları eklendi';
END

-- 3. Hidrolik Sistem Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'hidrolik-sistem-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Hidrolik Sistem Parçaları', 'hidrolik-sistem-parcalari', @MainCategoryId, @ImageUrl, 3, 1, GETDATE(), GETDATE());
    PRINT '✓ Hidrolik Sistem Parçaları eklendi';
END

-- 4. Elektrik Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'elektrik-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Elektrik Parçaları', 'elektrik-parcalari', @MainCategoryId, @ImageUrl, 4, 1, GETDATE(), GETDATE());
    PRINT '✓ Elektrik Parçaları eklendi';
END

-- 5. Fren Sistemi Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'fren-sistemi-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Fren Sistemi Parçaları', 'fren-sistemi-parcalari', @MainCategoryId, @ImageUrl, 5, 1, GETDATE(), GETDATE());
    PRINT '✓ Fren Sistemi Parçaları eklendi';
END

-- 6. Lastik ve Jant
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'lastik-ve-jant')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Lastik ve Jant', 'lastik-ve-jant', @MainCategoryId, @ImageUrl, 6, 1, GETDATE(), GETDATE());
    PRINT '✓ Lastik ve Jant eklendi';
END

-- 7. Aydınlatma Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'aydinlatma-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Aydınlatma Parçaları', 'aydinlatma-parcalari', @MainCategoryId, @ImageUrl, 7, 1, GETDATE(), GETDATE());
    PRINT '✓ Aydınlatma Parçaları eklendi';
END

-- 8. Filtreler
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'filtreler')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Filtreler', 'filtreler', @MainCategoryId, @ImageUrl, 8, 1, GETDATE(), GETDATE());
    PRINT '✓ Filtreler eklendi';
END

-- 9. Yağlar ve Sıvılar
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'yaglar-ve-sivilar')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Yağlar ve Sıvılar', 'yaglar-ve-sivilar', @MainCategoryId, @ImageUrl, 9, 1, GETDATE(), GETDATE());
    PRINT '✓ Yağlar ve Sıvılar eklendi';
END

-- 10. Kaporta Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'kaporta-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Kaporta Parçaları', 'kaporta-parcalari', @MainCategoryId, @ImageUrl, 10, 1, GETDATE(), GETDATE());
    PRINT '✓ Kaporta Parçaları eklendi';
END

-- 11. Soğutma Sistemi Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'sogutma-sistemi-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Soğutma Sistemi Parçaları', 'sogutma-sistemi-parcalari', @MainCategoryId, @ImageUrl, 11, 1, GETDATE(), GETDATE());
    PRINT '✓ Soğutma Sistemi Parçaları eklendi';
END

-- 12. Yakıt Sistemi Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'yakit-sistemi-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Yakıt Sistemi Parçaları', 'yakit-sistemi-parcalari', @MainCategoryId, @ImageUrl, 12, 1, GETDATE(), GETDATE());
    PRINT '✓ Yakıt Sistemi Parçaları eklendi';
END

-- 13. Radyatör ve Soğutucu Parçaları
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'radyator-ve-sogutucu-parcalari')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Radyatör ve Soğutucu Parçaları', 'radyator-ve-sogutucu-parcalari', @MainCategoryId, @ImageUrl, 13, 1, GETDATE(), GETDATE());
    PRINT '✓ Radyatör ve Soğutucu Parçaları eklendi';
END

-- 14. Aksesuarlar
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'aksesuarlar')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Aksesuarlar', 'aksesuarlar', @MainCategoryId, @ImageUrl, 14, 1, GETDATE(), GETDATE());
    PRINT '✓ Aksesuarlar eklendi';
END

-- 15. Yedek Parça Setleri
IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'yedek-parca-setleri')
BEGIN
    INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
    VALUES ('Yedek Parça Setleri', 'yedek-parca-setleri', @MainCategoryId, @ImageUrl, 15, 1, GETDATE(), GETDATE());
    PRINT '✓ Yedek Parça Setleri eklendi';
END

PRINT '';
PRINT '========================================';
PRINT 'Tüm kategoriler başarıyla eklendi!';
PRINT '========================================';





