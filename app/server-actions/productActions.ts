'use server';

import { revalidatePath } from 'next/cache';

// Mock Data (Build'in patlamaması için geçici veriler)
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: 'Örnek Ürün 1', 
    slug: 'ornek-urun-1', 
    price: 1500, 
    stock: 100, 
    categoryId: 1, 
    description: 'Bu bir örnek üründür.', 
    image: null,
    images: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 2, 
    name: 'Örnek Ürün 2', 
    slug: 'ornek-urun-2', 
    price: 2500, 
    stock: 50, 
    categoryId: 2, 
    description: 'Diğer örnek ürün.', 
    image: null,
    images: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

// 1. Ürünleri Getir (Filtreleme ile)
export async function getAllProducts(categorySlug: string = '', search: string = '', filters: any = {}) {
  try {
    let filtered = [...MOCK_PRODUCTS];

    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return {
      data: filtered,
      total: filtered.length,
      page: 1,
      limit: 10
    };

  } catch (error) {
    console.error('getAllProducts Hatası:', error);
    return { data: [], total: 0 };
  }
}

// 2. Tekil Ürün Getir (ID ile)
export async function getProductById(id: number) {
  try {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return product || null;
  } catch (error) {
    return null;
  }
}

// 3. Ürün Güncelle
export async function updateProduct(id: number, formData: FormData) {
  try {
    console.log(`Ürün güncellendi ID: ${id}`);
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Güncelleme sırasında hata oluştu' };
  }
}

// 4. Yeni Ürün Oluştur
export async function createProduct(formData: FormData) {
  try {
    console.log('Yeni ürün oluşturuluyor...');
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Oluşturma hatası' };
  }
}

// 5. Ürün Sil
export async function deleteProduct(id: number) {
  try {
    console.log(`Ürün silindi ID: ${id}`);
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Silme hatası' };
  }
}

// 6. Ürün Durumunu Değiştir
export async function toggleProductActive(id: number, isActive: boolean) {
  try {
    console.log(`Ürün durumu değişti ID: ${id} -> ${isActive}`);
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Durum değiştirilemedi' };
  }
}

// 7. Slug ile Ürün Getir (EKSİK OLAN BUYDU)
export async function getProductBySlug(slug: string) {
  try {
    console.log(`Slug ile ürün aranıyor: ${slug}`);
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error('getProductBySlug Hatası:', error);
    return null;
  }
}