import { getAllProducts } from '@/app/server-actions/productActions';
import { getMainCategories } from '@/app/server-actions/categoryActions';

// Bileşenleri import et
import Hero from '@/components/home/Hero';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import PopularProducts from '@/components/home/PopularProducts';
import { FeaturesBar, StatsSection, ServicesSection, CTASection } from '@/components/home/InfoSections';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // 1. Ürünleri Çek
  const productsResult = await getAllProducts();
  const products = productsResult.success && productsResult.data 
    ? productsResult.data.slice(0, 12)
    : [];
  
  // 2. Kategorileri Çek
  const categoriesResult = await getMainCategories(false);
  const mainCategories = categoriesResult.success && categoriesResult.data 
    ? categoriesResult.data.slice(0, 8)
    : [];

  return (
    <div className="bg-white">
      {/* Hero Alanı */}
      <Hero />
      
      {/* Özellikler Barı */}
      <FeaturesBar />

      {/* Kategoriler */}
      <CategoryShowcase categories={mainCategories} />

      {/* Popüler Ürünler */}
      <PopularProducts products={products} />

      {/* İstatistikler */}
      <StatsSection />

      {/* Hizmetler */}
      <ServicesSection />

      {/* İletişim / CTA */}
      <CTASection />
    </div>
  );
}