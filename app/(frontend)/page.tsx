import Link from 'next/link';
import { getMainCategories } from '@/app/server-actions/categoryActions';

export default async function HomePage() {
  // HATA ÇÖZÜMÜ:
  // 1. Parametre (false) kaldırıldı.
  // 2. Artık result.data yok, direkt array geliyor.
  const categories = await getMainCategories();

  // İlk 8 kategoriyi al (Array kontrolü ile)
  const mainCategories = Array.isArray(categories) ? categories.slice(0, 8) : [];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero / Banner Alanı */}
      <div className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Orijinal Yedek Parça
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            İhtiyacınız olan tüm yedek parçalar, en uygun fiyatlarla kapınızda.
          </p>
          <div className="mt-10">
            <Link
              href="/products"
              className="inline-block bg-pink-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-pink-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </div>

      {/* Kategoriler Bölümü */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Popüler Kategoriler</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mainCategories.length > 0 ? (
            mainCategories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center text-center border border-gray-100"
              >
                <div className="w-full aspect-square relative bg-gray-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  {cat.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
              Henüz kategori bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}