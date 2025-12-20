import Link from 'next/link';
import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/SkeletonLoader';

interface Props {
  products: any[];
}

export default function PopularProducts({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-accent-yellow"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-blue mb-6">
            Öne Çıkan Ürünler
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            En çok tercih edilen New Holland yedek parçaları
          </p>
          <div className="h-2 w-32 bg-accent-yellow rounded mx-auto"></div>
        </div>

        <Suspense fallback={<ProductGridSkeleton count={12} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Suspense>

        <div className="flex justify-center">
          <Link
            href="/products"
            className="bg-accent-yellow text-primary-blue-dark px-12 py-5 rounded-xl hover:bg-accent-yellow-light font-black transition-all transform hover:scale-110 shadow-2xl text-lg flex items-center gap-3 border-4 border-primary-blue/20 min-w-[240px] justify-center"
          >
            <span>Tüm Ürünleri İncele</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}