import { getCategoryTree } from '@/app/server-actions/categoryActions';
import CategoryForm from './CategoryForm';

export default async function NewCategoryPage() {
  // HATA ÇÖZÜMÜ:
  // getCategoryTree(true) yerine getCategoryTree() kullanıyoruz.
  // Çünkü action dosyasında parametreyi kaldırmıştık.
  const categories = await getCategoryTree();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yeni Kategori</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sisteme yeni bir kategori ekleyin.
          </p>
        </div>
      </div>

      <CategoryForm availableCategories={categories} />
    </div>
  );
}