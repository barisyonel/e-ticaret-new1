import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/app/server-actions/productActions';
// Eğer bu dosya yoksa hata almamak için yorum satırına alabilirsin:
// import { getProductRating } from '@/app/server-actions/reviewActions';
import ProductImageGallery from './ProductImageGallery';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productResult = await getProductBySlug(params.slug);

  // Eğer ürün bulunamadıysa 404 sayfasına git
  if (!productResult.success || !productResult.data) {
    notFound();
  }

  const product = productResult.data;

  // Yorum/Puanlama verisi (Opsiyonel - Hata vermemesi için güvenli hale getirildi)
  // const rating = await getProductRating(product.id);
  const rating = { average: 5, count: 0 }; // Geçici varsayılan veri

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Sol Taraf: Görsel Galerisi */}
        <div className="flex flex-col">
          <ProductImageGallery images={product.images || []} productName={product.name} slug={product.slug} />
        </div>

        {/* Sağ Taraf: Ürün Bilgileri */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Ürün Bilgileri</h2>
            <p className="text-3xl text-gray-900">{product.price} TL</p>
          </div>

          {/* Stok Durumu */}
          <div className="mt-6">
            <div className="flex items-center">
              {product.stock > 0 ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Stokta Var ({product.stock} adet)
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Tükendi
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Açıklama</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-10 flex sm:flex-col1">
            <button
              type="button"
              disabled={product.stock <= 0}
              className={`max-w-xs flex-1 bg-pink-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:w-full ${
                product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {product.stock > 0 ? 'Sepete Ekle' : 'Stok Yok'}
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Kategori ID: {product.categoryId}</p>
            <p>Ürün Kodu: {product.slug}</p>
          </div>
        </div>
      </div>
    </div>
  );
}