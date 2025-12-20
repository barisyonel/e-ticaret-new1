'use server';

import { revalidatePath } from 'next/cache';

// Mock Data
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: 'Traktör Yağ Filtresi', 
    slug: 'traktor-yag-filtresi', 
    price: 450, 
    stock: 100, 
    categoryId: 1, 
    description: 'Yüksek kaliteli yağ filtresi.', 
    image: null,
    images: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 2, 
    name: 'Hidrolik Pompa', 
    slug: 'hidrolik-pompa', 
    price: 2500, 
    stock: 15, 
    categoryId: 2, 
    description: 'New Holland uyumlu hidrolik pompa.', 
    image: null,
    images: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

export async function getAllProducts(categorySlug: string = '', search: string = '', filters: any = {}) {
  let filtered = [...MOCK_PRODUCTS];

  if (search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // HATA ÇÖZÜMÜ: "as any" ekledik.
  // Bu sayede ProductsPageClient.tsx içindeki "result.success" kontrolü hata vermez.
  return {
    success: true, 
    data: filtered,
    total: filtered.length,
    page: 1,
    limit: 10
  } as any;
}

export async function getProductById(id: number) {
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  return product || null;
}

export async function getProductBySlug(slug: string) {
  const product = MOCK_PRODUCTS.find(p => p.slug === slug);
  return product || null;
}

export async function createProduct(formData: FormData) {
  console.log('Ürün oluşturuldu (Simülasyon)');
  revalidatePath('/admin/products');
  return { success: true };
}

export async function updateProduct(id: number, formData: FormData) {
  console.log('Ürün güncellendi (Simülasyon)');
  revalidatePath('/admin/products');
  return { success: true };
}

export async function deleteProduct(id: number) {
  console.log('Ürün silindi (Simülasyon)');
  revalidatePath('/admin/products');
  return { success: true };
}

export async function toggleProductActive(id: number, isActive: boolean) {
  console.log(`Ürün durumu değişti: ${isActive}`);
  revalidatePath('/admin/products');
  return { success: true };
}