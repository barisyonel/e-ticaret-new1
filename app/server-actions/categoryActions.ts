// app/server-actions/categoryActions.ts
'use server';

import { CategoryService } from '@/lib/services/category-service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Servisi başlatıyoruz
const categoryService = new CategoryService();

// 1. Kategori Ekleme Action'ı
export async function createCategoryAction(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string | undefined,
      slug: (formData.get('slug') as string) || undefined,
      parentId: formData.get('parentId') ? Number(formData.get('parentId')) : null,
      isActive: formData.get('isActive') === 'on',
      image: (formData.get('image') as string) || null,
    };

    await categoryService.createCategory(rawData);
    revalidatePath('/admin/categories');
    
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Kategori oluşturulurken bir hata oluştu',
    };
  }

  redirect('/admin/categories');
}

// 2. Kategori Ağacını Getirme
export async function getCategoryTree(includeInactive = false) {
  try {
    const categories = await categoryService.getAllCategories(); 
    return { success: true, data: categories };
  } catch (error) {
    console.error('Kategori getirme hatası:', error);
    return { success: false, data: [] };
  }
}

// 3. Ana Kategorileri Getirme (EKSİK OLAN KISIM BU 👇)
// Anasayfa (page.tsx) bu fonksiyonu çağırıyor.
export async function getMainCategories(includeInactive = false) {
  try {
    // Tüm kategorileri çekiyoruz, filtreleme frontend tarafında veya serviste yapılabilir.
    // Şimdilik getCategoryTree ile aynı mantıkta çalışması yeterli.
    const categories = await categoryService.getAllCategories();
    
    // İstersen burada sadece ana kategorileri (parentId === null) filtreleyip döndürebiliriz:
    // const mainCategories = categories.filter(c => c.parentId === null);
    
    return { success: true, data: categories };
  } catch (error) {
    console.error('Ana kategori getirme hatası:', error);
    return { success: false, data: [] };
  }
}