import { Suspense } from 'react';
import { getAllProducts } from '@/app/server-actions/productActions';
import { getCategoryTree } from '@/app/server-actions/categoryActions';
import { getAllAttributesWithValues } from '@/app/server-actions/attributeActions';
import { getAllBrands } from '@/app/server-actions/brandActions';
// Component import'u (Yolunu kontrol et)
import ProductFilters from '@/components/ProductFilters';

// Geçici Product List (Build hatasını engellemek için component içine gömdüm)
const ProductList = ({ products }: { products: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {products.map((p) => (
      <div key={p.id} className="border p-4 rounded-lg hover:shadow-lg transition">
        <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center rounded">
           <span className="text-4xl">🚜</span>
        </div>
        <h3 className="font-bold text-lg mb-2">{p.name}</h3>
        <p className="text-pink-600 font-bold text-xl">{p.price} TL</p>
        <a href={`/products/${p.slug}`} className="block mt-4 text-center bg-gray-900 text-white py-2 rounded">
          İncele
        </a>
      </div>
    ))}
    {products.length === 0 && <p className="col-span-3 text-center py-10">Ürün bulunamadı.</p>}
  </div>
);

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
  // Parametreleri güvenli şekilde al
  const category = searchParams?.category || '';
  const search = searchParams?.search || '';

  // Verileri çek (Parametre hatalarını temizledik)
  const [productsRes, categoriesRes, attributesRes, brandsRes] = await Promise.all([
    getAllProducts(category, search),
    getCategoryTree(false), // Sadece aktif kategoriler
    getAllAttributesWithValues(true),
    getAllBrands(true)
  ]);

  // Ürün verisini güvenli hale getirme
  const products = productsRes.success && productsRes.data ? productsRes.data.products : [];

  // Kategori verisini güvenli hale getirme
  const categories = categoriesRes.success && categoriesRes.data ? categoriesRes.data : [];

  const attributes = (attributesRes as any).data || (Array.isArray(attributesRes) ? attributesRes : []);
  const brands = (brandsRes as any).data || (Array.isArray(brandsRes) ? brandsRes : []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <ProductFilters
            categories={categories}
            attributes={attributes}
            brands={brands}
            selectedCategory={category}
            selectedFilters={{}}
          />
        </aside>
        <main className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Ürünler</h1>
          <Suspense fallback={<div>Yükleniyor...</div>}>
            <ProductList products={products} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
