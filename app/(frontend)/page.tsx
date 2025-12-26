import Link from 'next/link';
import { getMainCategories } from '@/app/server-actions/categoryActions';
import { getAllProducts } from '@/app/server-actions/productActions';
import PopularProducts from '@/components/home/PopularProducts';

export default async function HomePage() {
  // Kategorileri çek
  const categoriesResult = await getMainCategories(false);
  const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];
  // Aktif kategorileri filtrele ve sırala
  const activeCategories = categories
    .filter(cat => cat.isActive !== false)
    .sort((a, b) => {
      // displayOrder'a göre sırala, yoksa isme göre
      if (a.displayOrder !== b.displayOrder) {
        return (a.displayOrder || 0) - (b.displayOrder || 0);
      }
      return a.name.localeCompare(b.name, 'tr');
    });
  const mainCategories = activeCategories.slice(0, 8);

  // Ürünleri çek (ilk 12 ürün)
  const productsResult = await getAllProducts('', '');
  const allProducts = productsResult.success && productsResult.data ? productsResult.data.products : [];
  const featuredProducts = allProducts.slice(0, 12);

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

      {/* Kategoriler Bölümü - Sadece kategoriler varsa göster */}
      {mainCategories.length > 0 && (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popüler Ürünler</h2>
            <Link
              href="/products"
              className="text-primary-blue hover:text-primary-blue-dark font-medium text-sm flex items-center gap-1"
            >
              Tüm Kategoriler <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mainCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
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
            ))}
          </div>
        </div>
      )}

      {/* Öne Çıkan Ürünler Bölümü - Her zaman göster (ürünler varsa) */}
      {featuredProducts.length > 0 && <PopularProducts products={featuredProducts} />}

      {/* Eğer ne kategori ne de ürün yoksa bilgilendirme mesajı */}
      {mainCategories.length === 0 && featuredProducts.length === 0 && (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz içerik eklenmemiş</h3>
            <p className="text-gray-500 mb-6">
              Kategoriler ve ürünler eklendiğinde burada görünecektir.
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-primary-blue-dark transition-colors font-medium"
            >
              Tüm Ürünleri Görüntüle
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}