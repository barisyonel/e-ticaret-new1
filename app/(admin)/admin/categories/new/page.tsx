import { getCategoryTree } from '@/app/server-actions/categoryActions';
import CategoryForm from './CategoryForm';

export default async function NewCategoryPage() {
  // DÜZELTME: Parantez içi boş olmalı. (true) yazmamalısın.
  const categories = await getCategoryTree();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yeni Kategori</h1>
        </div>
      </div>
      <CategoryForm availableCategories={categories} />
    </div>
  );
}