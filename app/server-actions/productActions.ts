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
    // Parse form data
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string || '';
    const price = parseFloat(formData.get('price') as string) || 0;
    const stock = parseInt(formData.get('stock') as string) || 0;
    const categoryId = formData.get('categoryId') ? parseInt(formData.get('categoryId') as string) : null;
    
    // Handle images
    const image = formData.get('image') as string;
    const imagesJson = formData.get('images') as string;
    
    let images: string | null = null;
    if (imagesJson) {
      // If images is JSON string, use it directly
      try {
        JSON.parse(imagesJson); // Validate JSON
        images = imagesJson;
      } catch {
        images = JSON.stringify([imagesJson]);
      }
    } else if (image) {
      // If single image, convert to JSON array
      images = JSON.stringify([image]);
    }

    // Validate required fields
    if (!name || !slug) {
      return {
        success: false,
        error: 'Ürün adı ve slug gereklidir',
      };
    }

    // Create product
    const product = await ProductRepository.create({
      name,
      slug,
      description,
      price,
      stock,
      images,
      isActive: stock > 0,
      primaryCategoryId: categoryId,
    });

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
    // Check if product exists
    const existingProduct = await ProductRepository.findById(id, true);
    if (!existingProduct) {
      return {
        success: false,
        error: 'Ürün bulunamadı',
      };
    }

    // Parse form data
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string || existingProduct.slug;
    const description = formData.get('description') as string || existingProduct.description;
    const price = parseFloat(formData.get('price') as string) || existingProduct.price;
    const stock = parseInt(formData.get('stock') as string) || existingProduct.stock;
    const categoryId = formData.get('categoryId') ? parseInt(formData.get('categoryId') as string) : null;
    
    // Handle images
    const image = formData.get('image') as string;
    const imagesJson = formData.get('images') as string;
    
    let images: string | null = null;
    if (imagesJson) {
      // If images is JSON string, use it directly
      try {
        JSON.parse(imagesJson); // Validate JSON
        images = imagesJson;
      } catch {
        images = JSON.stringify([imagesJson]);
      }
    } else if (image) {
      // If single image, convert to JSON array
      images = JSON.stringify([image]);
    } else {
      // Keep existing images if no new images provided
      images = existingProduct.images;
    }

    // Prepare update data
    const updateData: Partial<{
      name: string;
      slug: string;
      description: string;
      price: number;
      stock: number;
      images: string | null;
      isActive: boolean;
      primaryCategoryId: number | null;
    }> = {};

    if (name && name !== existingProduct.name) {
      updateData.name = name;
    }
    if (slug && slug !== existingProduct.slug) {
      updateData.slug = slug;
    }
    if (description !== existingProduct.description) {
      updateData.description = description;
    }
    if (price !== existingProduct.price) {
      updateData.price = price;
    }
    if (stock !== existingProduct.stock) {
      updateData.stock = stock;
    }
    if (images !== existingProduct.images) {
      updateData.images = images;
    }
    if (categoryId !== null && categoryId !== existingProduct.primaryCategoryId) {
      updateData.primaryCategoryId = categoryId;
    }

    // Update product
    const updatedProduct = await ProductRepository.update(id, updateData);

    if (!updatedProduct) {
      return {
        success: false,
        error: 'Ürün güncellenemedi',
      };
    }

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}/edit`);
    revalidatePath(`/products/${updatedProduct.slug}`);
    
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
    // Check if product exists
    const existingProduct = await ProductRepository.findById(id, true);
    if (!existingProduct) {
      return {
        success: false,
        error: 'Ürün bulunamadı',
      };
    }

    // Delete product
    const deleted = await ProductRepository.delete(id);

    if (!deleted) {
      return {
        success: false,
        error: 'Ürün silinemedi',
      };
    }

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
    // Check if product exists
    const existingProduct = await ProductRepository.findById(id, true);
    if (!existingProduct) {
      return {
        success: false,
        error: 'Ürün bulunamadı',
      };
    }

    // Update product active status
    const updatedProduct = await ProductRepository.update(id, {
      isActive: isActive,
    });

    if (!updatedProduct) {
      return {
        success: false,
        error: 'Ürün durumu güncellenemedi',
      };
    }

    revalidatePath('/admin/products');
    revalidatePath(`/products/${updatedProduct.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error('Toggle product active error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ürün durumu değiştirilirken bir hata oluştu',
    };
  }
}
