'use server';

import { revalidatePath } from 'next/cache';

// Mock Data
const MOCK_ATTRIBUTES = [
  {
    id: 1,
    name: 'Renk',
    slug: 'renk',
    values: [
      { id: 101, name: 'Kırmızı', slug: 'kirmizi', hex: '#FF0000' },
      { id: 102, name: 'Mavi', slug: 'mavi', hex: '#0000FF' },
      { id: 103, name: 'Sarı', slug: 'sari', hex: '#FFFF00' }
    ]
  },
  {
    id: 2,
    name: 'Beden',
    slug: 'beden',
    values: [
      { id: 201, name: 'S', slug: 's' },
      { id: 202, name: 'M', slug: 'm' },
      { id: 203, name: 'L', slug: 'l' }
    ]
  }
];

// 1. Tüm Özellikleri Getir
export async function getAllAttributesWithValues(includeCounts: boolean = false) {
  const data = MOCK_ATTRIBUTES;
  return {
    data: data,
    success: true,
    map: (cb: any) => data.map(cb),
    length: data.length,
    [Symbol.iterator]: function* () { yield* data; }
  } as any;
}

// 2. Tekil Özellik Getir
export async function getAttributeById(id: number) {
  const attr = MOCK_ATTRIBUTES.find(a => a.id === id);
  return attr || null;
}

// 3. Özellik Oluştur
export async function createAttribute(formData: FormData) {
  revalidatePath('/admin/attributes');
  return { success: true, error: null };
}

// 4. Özellik Güncelle
export async function updateAttribute(id: number, formData: FormData) {
  revalidatePath('/admin/attributes');
  return { success: true, error: null };
}

// 5. Özellik Sil
export async function deleteAttribute(id: number) {
  revalidatePath('/admin/attributes');
  return { success: true, error: null };
}

// 6. Özellik Durumunu Değiştir (EKSİK OLAN BUYDU)
export async function toggleAttributeActive(id: number, isActive: boolean) {
  revalidatePath('/admin/attributes');
  return { success: true, error: null };
}

// --- DEĞER (VALUE) İŞLEMLERİ ---

export async function createAttributeValue(attributeId: number, formData: FormData) {
  revalidatePath(`/admin/attributes/${attributeId}/edit`);
  return { success: true, error: null };
}

export async function updateAttributeValue(valueId: number, formData: FormData) {
  revalidatePath('/admin/attributes');
  return { success: true, error: null };
}

export async function deleteAttributeValue(valueId: number) {
  revalidatePath('/admin/attributes');
  return { success: true, error: null };
}