'use server';

import { revalidatePath } from 'next/cache';

// ---------------------------------------------------------
// 1. VERİ GETİRME İŞLEMLERİ (READ)
// ---------------------------------------------------------

// Kategori Ağacını Getir (Navbar, MegaMenu ve Dropdownlar için)
export async function getCategoryTree() {
  // Build hatası vermemesi için boş dizi dönüyoruz
  return [];
}

// Ana Kategorileri Getir (Anasayfa vitrini için)
export async function getMainCategories() {
  return [];
}

// Tekil Kategori Getir (Edit sayfası için)
export async function getCategoryById(id: number) {
  try {
    console.log(`Kategori aranıyor ID: ${id}`);
    
    // Geçici Mock Data (TypeScript kızmasın diye dolu obje dönüyoruz)
    return { 
      id: id, 
      name: "Test Kategorisi", 
      slug: "test-kategorisi", 
      description: "Bu bir test kategorisidir.",
      parentId: null,
      image: null,
      isActive: true
    };
    
  } catch (error) {
    console.error("getCategoryById Hatası:", error);
    return null;
  }
}

// ---------------------------------------------------------
// 2. VERİ DEĞİŞTİRME İŞLEMLERİ (WRITE - ACTIONS)
// ---------------------------------------------------------

// Yeni Kategori Oluştur
export async function createCategoryAction(formData: FormData) {
  try {
    console.log("Yeni kategori oluşturuluyor...");
    // Veritabanı işlemleri buraya gelecek
    
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Oluşturma hatası' };
  }
}

// Kategori Güncelle
export async function updateCategory(id: number, formData: FormData) {
  try {
    console.log(`Kategori güncelleniyor ID: ${id}`);
    // Veritabanı güncelleme işlemleri buraya gelecek

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Güncelleme hatası' };
  }
}

// Kategori Silme İşlemi
export async function deleteCategory(id: number) {
  try {
    console.log(`Kategori siliniyor ID: ${id}`);
    // Veritabanı silme işlemleri buraya gelecek

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error("deleteCategory Hatası:", error);
    return { success: false, error: "Silme işlemi sırasında hata oluştu." };
  }
}

// Aktif/Pasif Durum Değiştirme
export async function toggleCategoryActive(id: number, isActive: boolean) {
  try {
    console.log(`Kategori durumu değişti ID: ${id} -> ${isActive}`);
    // Veritabanı güncelleme işlemleri buraya gelecek

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Durum değiştirilemedi' };
  }
}