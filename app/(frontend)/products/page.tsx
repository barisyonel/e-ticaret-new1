import { Suspense } from 'react';
// Actions
import { getAllProducts } from '@/app/server-actions/productActions';
import { getCategoryTree } from '@/app/server-actions/categoryActions';
import { getAllAttributesWithValues } from '@/app/server-actions/attributeActions';
// Not: Brand actions dosyan olmadığı için kaldırdım.
// import { getAllBrands } from '@/app/server-actions/brandActions';

// Components
import ProductFilters from '@/components/ProductFilters';

// --- GEÇİCİ BİLEŞEN (Build hatasını çözmek için) ---
// Kendi ProductList bileşeninin yerini bulduğunda bu kısmı silip yukarıya import ekleyebilirsin.
// import ProductList from '@/components/ProductList';
const ProductList = ({ products }: { products: any[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((p) => (
      <div key={p.id} className="border p-4 rounded shadow hover:shadow-lg transition">
        <h3 className="font-bold">{p.name}</h3>
        <p className="text-gray-600">{p.price} TL</p>
      </div>
    ))}
    {products.length === 0 && <p>Ürün bulunamadı.</p>}
  </div>
);
// ---------------------------------------------------

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Parametreleri ayıkla
  const category = searchParams.category || '';
  const search = searchParams.search || '';
  const page = parseInt(searchParams.page || '1');
  
  // Filtreleri hazırla
  const attributeFilters: Record<string, string[]> = {};
  Object.keys(searchParams).forEach((key) => {
    if (key.startsWith('attr_')) {
      const attrId = key.replace('attr_', '');
      const value = searchParams[key];
      if (value) {
        attributeFilters[attrId] = Array.isArray(value) ? value : value.split(',');
      }
    }
  });

  // Verileri paralel çek
  // HATA ÇÖZÜMÜ: getAllBrands kaldırıldı, getCategoryTree parametresi silindi.
  const [productsResult, categoriesResult, attributesResult] = await Promise.all([
    getAllProducts(category, search, attributeFilters),
    getCategoryTree(), // Parametresiz (DÜZELTİLDİ)
    getAllAttributesWithValues(true)
  ]);

  // --- VERİ GÜVENLİK KONTROLLERİ ---
  
  // 1. Ürünler
  const pRes = productsResult as any;
  const products = pRes.data || (Array.isArray(pRes) ? pRes : []);
  const totalProducts = pRes.total || products.length;

  // 2. Kategoriler
  const cRes = categoriesResult as any;
  const categories = Array.isArray(cRes) ? cRes : (cRes.data || []);

  // 3. Özellikler
  const aRes = attributesResult as any;
  const attributes = aRes.data || (Array.isArray(aRes) ? aRes : []);

  // 4. Markalar (Dosya olmadığı için boş dizi veriyoruz)
  const brands: any[] = [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol Menü: Filtreler */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <ProductFilters 
            categories={categories}
            attributes={attributes}
            brands={brands}
            selectedCategory={category}
            selectedFilters={attributeFilters}
          />
        </aside>

        {/* Sağ Alan: Ürün Listesi */}
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {search ? `"${search}" Arama Sonuçları` : 'Tüm Ürünler'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Toplam {totalProducts} ürün bulundu.
            </p>
          </div>

          <Suspense fallback={<div className="text-center py-20">Yükleniyor...</div>}>
            <ProductList products={products} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}