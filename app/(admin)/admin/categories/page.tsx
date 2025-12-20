import Link from 'next/link';
import { getCategoryTree } from '@/app/server-actions/categoryActions';
// Eğer CategoryRow importunda hata alırsan yolunu kontrol et
import CategoryRow from './CategoryRow'; 

export default async function CategoriesPage() {
  // Admin panelinde tüm kategorileri göster (aktif ve pasif)
  const result = await getCategoryTree(true);
  const categories = result.success && result.data ? result.data : [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kategori ağacını yönetin, düzenleyin veya silin.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
        >
          + Yeni Kategori
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori Adı
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Görsel
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sıra
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Array boş mu kontrolü */}
            {!categories || categories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  Henüz hiç kategori eklenmemiş.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <CategoryRow 
                  key={category.id} 
                  category={category} 
                  level={0} 
                  parentName={null} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}