'use server';

// app/server-actions/categoryActions.ts

// Prisma kullanıyorsan import'u açabilirsin:
// import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 1. Kategoriyi ID'ye göre getirme (Edit sayfası için gerekli)
export async function getCategoryById(id: number) {
  try {
    // DB Bağlantısı varsa: const category = await prisma.category.findUnique({ where: { id } });
    
    // Geçici Mock Data (Build hatası vermemesi için):
    return {
      id: id,
      name: "Örnek Kategori",
      slug: "ornek-kategori",
      description: "Bu kategori düzenleme testi içindir."
    };
  } catch (error) {
    console.error('Kategori getirme hatası:', error);
    return null;
  }
}

// 2. Kategori Silme (Delete butonu için gerekli)
export async function deleteCategory(id: number) {
  try {
    // DB silme kodu buraya gelecek:
    // await prisma.category.delete({ where: { id } });
    
    console.log(`Kategori silindi ID: ${id}`);

    // Silme işleminden sonra listeyi yenilemek için cache temizlenir
    revalidatePath('/admin/categories');
    
    return { success: true };
  } catch (error) {
    console.error('Kategori silme hatası:', error);
    return { success: false, error: 'Silme işlemi sırasında sunucu hatası.' };
  }
}