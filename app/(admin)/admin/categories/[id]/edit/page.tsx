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

  // DÜZELTME: getCategoryById sadece ID alıyor. getCategoryTree parametre almıyor.
  const [category, categories] = await Promise.all([
    getCategoryById(categoryId),
    getCategoryTree()
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategori Düzenle</h1>
        </div>
      </div>
      <EditCategoryForm category={category} availableCategories={categories} />
    </div>
  );
}