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

  // Admin panelinde tüm kategorileri göster (aktif ve pasif)
  const [categoryResult, categoriesResult] = await Promise.all([
    getCategoryById(categoryId, true),
    getCategoryTree(true)
  ]);

  const category = categoryResult.success && categoryResult.data ? categoryResult.data : null;
  const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];

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