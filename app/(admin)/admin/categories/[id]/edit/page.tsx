import { notFound } from 'next/navigation';
import { getCategoryById, getCategoryTree } from '@/app/server-actions/categoryActions';
import EditCategoryForm from './EditCategoryForm';

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const categoryId = parseInt(params.id);

  if (isNaN(categoryId)) {
    notFound();
  }

  // Verileri paralel olarak çekiyoruz
  // DÜZELTME: getCategoryById artık sadece ID alıyor (2. parametre silindi)
  const [category, categories] = await Promise.all([
    getCategoryById(categoryId),
    getCategoryTree()
  ]);

  // Eğer kategori bulunamazsa 404
  // DÜZELTME: Artık direkt category null mu diye bakıyoruz (success/data yok)
  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategori Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">
            "{category.name}" kategorisinin bilgilerini güncelleyin.
          </p>
        </div>
      </div>

      <EditCategoryForm 
        category={category} 
        availableCategories={categories} 
      />
    </div>
  );
}