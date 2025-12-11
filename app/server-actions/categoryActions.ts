'use server';

import { revalidatePath } from 'next/cache';

// ---------------------------------------------------------
// 1. VERİ GETİRME İŞLEMLERİ (READ)
// ---------------------------------------------------------

// Kategori Ağacını Getir
export async function getCategoryTree() {
  // HATA ÇÖZÜMÜ: "as any[]" ekledik. Artık TypeScript buna "never" demiyor.
  return [] as any[];
}

// Ana Kategorileri Getir
export async function getMainCategories() {
  return [] as any[];
}

// Tekil Kategori Getir
export async function getCategoryById(id: number) {
  try {
    console.log(`Kategori aranıyor ID: ${id}`);
    
    return { 
      id: id, 
      name: "Test Kategorisi", 
      slug: "test-kategorisi", 
      description: "Bu bir test kategorisidir.",
      parentId: null,
      image: null,
      isActive: true,
      displayOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      children: [] as any[] // Burayı da garantiye aldık
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