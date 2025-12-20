import { getCategoryTree } from "@/app/server-actions/categoryActions";
import CategoryForm from "./CategoryForm";

export default async function NewCategoryPage() {
  // Admin panelinde tüm kategorileri göster (aktif ve pasif)
  const result = await getCategoryTree(true);
  const categories = result.success && result.data ? result.data : [];

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
