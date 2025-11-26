import Link from 'next/link';
import { getAllProducts } from '@/app/server-actions/productActions';
import ProductCard from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/SkeletonLoader';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Get first 8 products for homepage
  const productsResult = await getAllProducts();
  const products = productsResult.success && productsResult.data 
    ? productsResult.data.slice(0, 8)
    : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width Modern Design */}
      <section className="relative bg-gradient-to-br from-primary-blue via-primary-blue-dark to-primary-blue-darker text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-blue-200/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Hero Content - Full Width */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="mb-8 animate-fadeInUp">
                  <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg border border-white/20">
                    🚜 NEW HOLLAND YEDEK PARÇA
                  </span>
                </div>
                
                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 text-white leading-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    New Holland
                  </span>
                  <br />
                  <span className="text-blue-200">
                    Yedek Parça
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-blue-100 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Orijinal parçalar, profesyonel hizmet, güvenilir çözümler
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <Link 
                    href="/products" 
                    className="bg-white text-primary-blue-dark px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/20 min-w-[250px] group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Ürünleri Keşfet
                    </span>
                  </Link>
                  <Link 
                    href="/iletisim" 
                    className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white hover:text-primary-blue-dark transition-all transform hover:scale-105 shadow-2xl min-w-[250px] group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      İletişime Geç
                    </span>
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">500+</div>
                    <div className="text-blue-200 font-medium">Farklı Parça</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">24/7</div>
                    <div className="text-blue-200 font-medium">Destek</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">1000+</div>
                    <div className="text-blue-200 font-medium">Müşteri</div>
                  </div>
                </div>
              </div>
              
              {/* Right Content - Visual */}
              <div className="relative animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                <div className="relative">
                  {/* Main Visual Container */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Feature Cards */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Orijinal Parçalar</h3>
                        <p className="text-blue-100 text-sm">Garantili ve sertifikalı</p>
                      </div>
                      
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Hızlı Teslimat</h3>
                        <p className="text-blue-100 text-sm">Aynı gün kargo</p>
                      </div>
                      
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Teknik Destek</h3>
                        <p className="text-blue-100 text-sm">Uzman ekibimiz</p>
                      </div>
                      
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Uygun Fiyat</h3>
                        <p className="text-blue-100 text-sm">Rekabetçi fiyatlar</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300/20 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Full Width */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary-blue/10 text-primary-blue px-6 py-2 rounded-full text-sm font-bold mb-6">
                ⭐ ÖZEL SEÇİM
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-blue-dark mb-6">
                Öne Çıkan Ürünler
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                En çok tercih edilen New Holland yedek parçalarımızı keşfedin
              </p>
            </div>

            {/* Products Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </Suspense>

            {/* View All Button */}
            <div className="text-center mt-16">
              <Link 
                href="/products" 
                className="inline-flex items-center gap-3 bg-primary-blue text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-primary-blue-dark transition-all transform hover:scale-105 shadow-2xl hover:shadow-primary-blue/30"
              >
                <span>Tüm Ürünleri Gör</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Full Width */}
      <section className="py-20 bg-primary-blue text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block bg-white/10 text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
                🔧 KATEGORİLER
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                Ürün Kategorileri
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                İhtiyacınız olan parçayı kolayca bulun
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Motor Parçaları', icon: '🔧', count: '150+', color: 'from-blue-500 to-blue-600' },
                { name: 'Hidrolik Sistem', icon: '⚙️', count: '80+', color: 'from-indigo-500 to-indigo-600' },
                { name: 'Transmisyon', icon: '🔩', count: '120+', color: 'from-purple-500 to-purple-600' },
                { name: 'Fren Sistemi', icon: '🛠️', count: '60+', color: 'from-pink-500 to-pink-600' },
                { name: 'Elektrik Parçaları', icon: '⚡', count: '90+', color: 'from-yellow-500 to-yellow-600' },
                { name: 'Filtreleme', icon: '🔍', count: '70+', color: 'from-green-500 to-green-600' }
              ].map((category, index) => (
                <Link 
                  key={index}
                  href={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-blue-100 mb-4">{category.count} ürün</p>
                    <div className="flex items-center text-white group-hover:text-blue-200 transition-colors">
                      <span className="text-sm font-medium">Keşfet</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Full Width */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary-blue/10 text-primary-blue px-6 py-2 rounded-full text-sm font-bold mb-6">
                🛠️ HİZMETLERİMİZ
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-blue-dark mb-6">
                Neden Bizi Tercih Etmelisiniz?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Profesyonel ekibimiz ve kaliteli hizmetimizle yanınızdayız
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Orijinal Parçalar',
                  description: 'New Holland orijinal yedek parçaları',
                  icon: '✅',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Hızlı Teslimat',
                  description: 'Türkiye geneli hızlı kargo',
                  icon: '🚚',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Teknik Destek',
                  description: 'Uzman ekibimizden profesyonel yardım',
                  icon: '🔧',
                  color: 'from-purple-500 to-violet-500'
                },
                {
                  title: 'Garanti',
                  description: 'Tüm ürünlerimizde garanti',
                  icon: '🛡️',
                  color: 'from-orange-500 to-red-500'
                }
              ].map((service, index) => (
                <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-primary-blue-dark mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}