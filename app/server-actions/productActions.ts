'use server';

import { revalidatePath } from 'next/cache';
import { ProductRepository } from '@/lib/repositories/ProductRepository';

export interface ActionResponse<T = void> {
  success: boolean;
  error?: string;
  data?: T;
}

// Parse images from JSON string
function parseImages(imagesJson: string | null): string[] {
  if (!imagesJson) return [];
  try {
    const parsed = JSON.parse(imagesJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function getAllProducts(categorySlug: string = '', search: string = '', filters: any = {}): Promise<ActionResponse<{
  products: any[];
  total: number;
  page: number;
  limit: number;
}>> {
  try {
    const products = await ProductRepository.findAll(false); // Sadece aktif ürünler

    // Format products
    let formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      stock: product.stock,
      description: product.description,
      images: parseImages(product.images),
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    // Filter by category if provided
    if (categorySlug) {
      // Get category by slug
      const CategoryRepository = (await import('@/lib/repositories/CategoryRepository')).CategoryRepository;
      const repo = new CategoryRepository();
      const category = await repo.findBySlug(categorySlug, false);
      if (category) {
        // Get products in this category (you may need to implement this in ProductRepository)
        // For now, we'll just filter by primaryCategoryId if available
        // Note: This is a simplified filter - you may need to join with product_categories table
        // formattedProducts = formattedProducts.filter(p => p.categoryId === category.id);
      }
    }

    // Filter by search
    if (search) {
      formattedProducts = formattedProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return {
      success: true,
      data: {
        products: formattedProducts,
        total: formattedProducts.length,
        page: 1,
        limit: 100,
      },
    };
  } catch (error) {
    console.error('Get all products error:', error);
    return {
      success: false,
      error: 'Ürünler yüklenirken bir hata oluştu',
      data: {
        products: [],
        total: 0,
        page: 1,
        limit: 100,
      },
    };
  }
}

export async function getProductById(id: number): Promise<ActionResponse<any>> {
  try {
    const product = await ProductRepository.findById(id, false);
    if (!product) {
      return {
        success: false,
        error: 'Ürün bulunamadı',
      };
    }

    return {
      success: true,
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        stock: product.stock,
        description: product.description,
        images: parseImages(product.images),
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    };
  } catch (error) {
    console.error('Get product by id error:', error);
    return {
      success: false,
      error: 'Ürün yüklenirken bir hata oluştu',
    };
  }
}

export async function getProductBySlug(slug: string): Promise<ActionResponse<any>> {
  try {
    const product = await ProductRepository.findBySlug(slug, false);
    if (!product) {
      return {
        success: false,
        error: 'Ürün bulunamadı',
      };
    }

    return {
      success: true,
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        stock: product.stock,
        description: product.description,
        images: parseImages(product.images),
        isActive: product.isActive,
        categoryId: product.primaryCategoryId || null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    };
  } catch (error) {
    console.error('Get product by slug error:', error);
    return {
      success: false,
      error: 'Ürün yüklenirken bir hata oluştu',
    };
  }
}

export async function createProduct(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Ürün oluşturuldu (Simülasyon)');
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Create product error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ürün oluşturulurken bir hata oluştu',
    };
  }
}

export async function updateProduct(id: number, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Ürün güncellendi (Simülasyon)');
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Update product error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ürün güncellenirken bir hata oluştu',
    };
  }
}

export async function deleteProduct(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Ürün silindi (Simülasyon)');
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Delete product error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ürün silinirken bir hata oluştu',
    };
  }
}

export async function toggleProductActive(id: number, isActive: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`Ürün durumu değişti: ${isActive}`);
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Toggle product active error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ürün durumu değiştirilirken bir hata oluştu',
    };
  }
}
