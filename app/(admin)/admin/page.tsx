import Link from 'next/link';
// Repository yerine güvenli Action'ı kullanıyoruz:
import { getCategoryTree } from '@/app/server-actions/categoryActions';

export default async function AdminDashboard() {
  // 1. Kategorileri güvenli yoldan çekiyoruz
  const categories = await getCategoryTree();

  // 2. Ürünleri şimdilik boş dizi olarak tanımlıyoruz (Build hatası almamak için)
  // İleride buraya: const products = await getProducts(); gibi bir action ekleyeceğiz.
  const products: any[] = [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
      
      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kategori Kartı */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Toplam Kategori</p>
              <h2 className="text-3xl font-bold text-gray-800">{categories.length}</h2>
            </div>
            <div className="text-pink-500 text-4xl">📂</div>
          </div>
          <Link href="/admin/categories" className="text-sm text-pink-600 hover:underline mt-4 inline-block">
            Kategorileri Yönet →
          </Link>
        </div>

        {/* Ürün Kartı */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Toplam Ürün</p>
              <h2 className="text-3xl font-bold text-gray-800">{products.length}</h2>
            </div>
            <div className="text-blue-500 text-4xl">📦</div>
          </div>
          <Link href="/admin/products" className="text-sm text-blue-600 hover:underline mt-4 inline-block">
            Ürünleri Yönet →
          </Link>
        </div>

        {/* Sipariş Kartı (Örnek) */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Bekleyen Sipariş</p>
              <h2 className="text-3xl font-bold text-gray-800">0</h2>
            </div>
            <div className="text-green-500 text-4xl">🛒</div>
          </div>
          <span className="text-sm text-gray-400 mt-4 inline-block">
            Henüz aktif değil
          </span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-blue-800">Sistem Durumu</h3>
        <p className="text-sm text-blue-600">
          Yönetim paneli başarıyla çalışıyor. Sol menüyü kullanarak işlemlere başlayabilirsiniz.
        </p>
      </div>
    </div>
  );
}