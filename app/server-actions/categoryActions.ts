'use server';

import { revalidatePath } from 'next/cache';
import { CategoryRepository } from '@/lib/repositories/CategoryRepository';
import { Category } from '@/lib/repositories/CategoryRepository';

export interface ActionResponse<T = void> {
  success: boolean;
  error?: string;
  data?: T;
}

// Kategori ağacını getir (hierarchical structure)
export async function getCategoryTree(includeInactive: boolean = false): Promise<ActionResponse<Category[]>> {
  try {
    const repo = new CategoryRepository();
    const categories = await repo.findCategoryTree(includeInactive);

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error('Get category tree error:', error);
    return {
      success: false,
      error: 'Kategoriler yüklenirken bir hata oluştu',
      data: [],
    };
  }
}

// Ana kategorileri getir (sadece parent_id IS NULL olanlar)
export async function getMainCategories(includeInactive: boolean = false): Promise<ActionResponse<Category[]>> {
  try {
    const repo = new CategoryRepository();
    const allCategories = await repo.getAll(includeInactive);
    const mainCategories = allCategories.filter(cat => cat.parentId === null);

    return {
      success: true,
      data: mainCategories,
    };
  } catch (error) {
    console.error('Get main categories error:', error);
    return {
      success: false,
      error: 'Kategoriler yüklenirken bir hata oluştu',
      data: [],
    };
  }
}

// ID'ye göre kategori getir
export async function getCategoryById(id: number, includeInactive: boolean = false): Promise<ActionResponse<Category>> {
  try {
    const repo = new CategoryRepository();
    const category = await repo.findById(id, includeInactive);

    if (!category) {
      return {
        success: false,
        error: 'Kategori bulunamadı',
      };
    }

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error('Get category by id error:', error);
    return {
      success: false,
      error: 'Kategori yüklenirken bir hata oluştu',
    };
  }
}

// Kategori oluştur
export async function createCategoryAction(formData: FormData): Promise<ActionResponse<Category>> {
  try {
    const repo = new CategoryRepository();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const parentIdStr = formData.get('parentId') as string | null;
    const image = formData.get('image') as string | null;
    const displayOrderStr = formData.get('displayOrder') as string | null;
    const isActiveStr = formData.get('isActive') as string | null;

    const parentId = parentIdStr && parentIdStr !== 'null' ? parseInt(parentIdStr) : null;
    const displayOrder = displayOrderStr ? parseInt(displayOrderStr) : 0;
    const isActive = isActiveStr ? isActiveStr === 'true' : true;

    const category = await repo.create({
      name,
      slug: slug || name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
      parentId,
      image: image || null,
      isActive,
    });

    // Update display order if provided
    if (displayOrder !== 0) {
      await repo.update(category.id, { displayOrder } as any);
    }

    revalidatePath('/admin/categories');
    revalidatePath('/');

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error('Create category error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Kategori oluşturulurken bir hata oluştu',
    };
  }
}

// Kategori güncelle
export async function updateCategory(id: number, formData: FormData): Promise<ActionResponse<Category>> {
  try {
    const repo = new CategoryRepository();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const parentIdStr = formData.get('parentId') as string | null;
    const image = formData.get('image') as string | null;
    const displayOrderStr = formData.get('displayOrder') as string | null;
    const isActiveStr = formData.get('isActive') as string | null;

    const parentId = parentIdStr && parentIdStr !== 'null' ? parseInt(parentIdStr) : null;
    const displayOrder = displayOrderStr ? parseInt(displayOrderStr) : 0;
    const isActive = isActiveStr ? isActiveStr === 'true' : true;

    const updates: any = {
      name,
      slug: slug || name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
      parentId,
      image: image || null,
      isActive,
      displayOrder,
    };

    const category = await repo.update(id, updates);

    if (!category) {
      return {
        success: false,
        error: 'Kategori bulunamadı',
      };
    }

    revalidatePath('/admin/categories');
    revalidatePath('/');

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error('Update category error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Kategori güncellenirken bir hata oluştu',
    };
  }
}

// Kategori sil
export async function deleteCategory(id: number): Promise<ActionResponse> {
  try {
    const repo = new CategoryRepository();
    const deleted = await repo.delete(id);

    if (!deleted) {
      return {
        success: false,
        error: 'Kategori silinemedi veya bulunamadı',
      };
    }

    revalidatePath('/admin/categories');
    revalidatePath('/');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Delete category error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Kategori silinirken bir hata oluştu',
    };
  }
}

// Kategori aktif/pasif durumunu değiştir
export async function toggleCategoryActive(id: number, isActive: boolean): Promise<ActionResponse<Category>> {
  try {
    const repo = new CategoryRepository();
    const category = await repo.update(id, { isActive });

    if (!category) {
      return {
        success: false,
        error: 'Kategori bulunamadı',
      };
    }

    revalidatePath('/admin/categories');
    revalidatePath('/');

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error('Toggle category active error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Kategori durumu değiştirilirken bir hata oluştu',
    };
  }
}
