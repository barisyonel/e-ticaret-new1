'use server';

import { revalidatePath } from 'next/cache';

// ---------------------------------------------------------
// 1. VERİ GETİRME İŞLEMLERİ (READ)
// ---------------------------------------------------------

// Kategori Ağacını Getir
export async function getCategoryTree() {
  return [];
}

// Ana Kategorileri Getir
export async function getMainCategories() {
  return [];
}

// Tekil Kategori Getir (GÜNCELLENEN KISIM BURASI)
export async function getCategoryById(id: number) {
  try {
    console.log(`Kategori aranıyor ID: ${id}`);
    
    // Eksik alanlar (displayOrder, createdAt, updatedAt) eklendi
    return { 
      id: id, 
      name: "Test Kategorisi", 
      slug: "test-kategorisi", 
      description: "Bu bir test kategorisidir.",
      parentId: null,
      image: null,
      isActive: true,
      displayOrder: 1,           // EKLENDİ
      createdAt: new Date(),     // EKLENDİ
      updatedAt: new Date(),     // EKLENDİ
      children: []               // EKLENDİ (Garanti olsun diye)
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
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Durum değiştirilemedi' };
  }
}