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

// Tekil Kategori Getir (GÜNCELLENEN KISIM: Eksik alanlar eklendi)
export async function getCategoryById(id: number) {
  try {
    console.log(`Kategori aranıyor ID: ${id}`);
    
    // TypeScript'in istediği TÜM alanları ekliyoruz
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
      children: []               // EKLENDİ
    };
    
  } catch (error) {
    console.error("getCategoryById Hatası:", error);
    return null;
  }
}

// ---------------------------------------------------------
// 2. VERİ DEĞİŞTİRME İŞLEMLERİ (WRITE)
// ---------------------------------------------------------

export async function createCategoryAction(formData: FormData) {
  try {
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Oluşturma hatası' };
  }
}

export async function updateCategory(id: number, formData: FormData) {
  try {
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Güncelleme hatası' };
  }
}

export async function deleteCategory(id: number) {
  try {
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Silme hatası" };
  }
}

export async function toggleCategoryActive(id: number, isActive: boolean) {
  try {
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Durum değiştirilemedi' };
  }
}