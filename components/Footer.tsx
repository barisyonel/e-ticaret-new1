import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary-blue-darker via-primary-blue-dark to-primary-blue-darker text-white mt-20 relative overflow-hidden">
      {/* Top Yellow Border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-accent-yellow"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-yellow rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 pt-18 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <div className="flex items-center space-x-3">
                <div className="bg-accent-yellow/20 rounded-xl p-3 group-hover:bg-accent-yellow/30 transition-all border-2 border-accent-yellow/30 group-hover:border-accent-yellow">
                  <span className="text-3xl font-black text-white group-hover:text-accent-yellow transition">
                    NH
                  </span>
                </div>
          <div>
                  <div className="text-2xl font-black text-white group-hover:text-accent-yellow transition">
                    New Holland
                  </div>
                  <div className="text-xs text-white/80 font-bold">
                    Yedek Parça Bayi
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Orijinal New Holland yedek parçaları ve profesyonel servis hizmetleri ile traktörünüzün yanında. 
              Kalite, güvenilirlik ve müşteri memnuniyeti bizim önceliğimiz.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-accent-yellow rounded-xl flex items-center justify-center text-white hover:text-primary-blue-dark transition-all transform hover:scale-110 border-2 border-white/20 hover:border-accent-yellow"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-accent-yellow rounded-xl flex items-center justify-center text-white hover:text-primary-blue-dark transition-all transform hover:scale-110 border-2 border-white/20 hover:border-accent-yellow"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-accent-yellow rounded-xl flex items-center justify-center text-white hover:text-primary-blue-dark transition-all transform hover:scale-110 border-2 border-white/20 hover:border-accent-yellow"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-accent-yellow rounded-xl flex items-center justify-center text-white hover:text-primary-blue-dark transition-all transform hover:scale-110 border-2 border-white/20 hover:border-accent-yellow"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black text-accent-yellow mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-yellow rounded-full"></span>
              Hızlı Linkler
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  Tüm Ürünler
                </Link>
              </li>
              <li>
                <Link href="/randevu" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  Randevu Al
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  Hesabım
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-black text-accent-yellow mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-yellow rounded-full"></span>
              Müşteri Hizmetleri
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  Yardım & Destek
                </Link>
              </li>
              <li>
                <Link href="/profile/orders" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  Sipariş Takibi
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  İade & Değişim
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition font-medium flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all"></span>
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-black text-accent-yellow mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-yellow rounded-full"></span>
              İletişim Bilgileri
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-accent-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-yellow transition-all border-2 border-accent-yellow/30 group-hover:border-accent-yellow">
                  <svg className="w-5 h-5 text-accent-yellow group-hover:text-primary-blue-dark transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase mb-1">Telefon</div>
                  <a href="tel:+904440648" className="text-white font-bold text-lg hover:text-accent-yellow transition">
                    444 0 648
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-accent-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-yellow transition-all border-2 border-accent-yellow/30 group-hover:border-accent-yellow">
                  <svg className="w-5 h-5 text-accent-yellow group-hover:text-primary-blue-dark transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase mb-1">E-posta</div>
                  <a href="mailto:info@newhollandbayi.com" className="text-white font-bold text-sm hover:text-accent-yellow transition break-all">
                    info@newhollandbayi.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-accent-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-yellow transition-all border-2 border-accent-yellow/30 group-hover:border-accent-yellow">
                  <svg className="w-5 h-5 text-accent-yellow group-hover:text-primary-blue-dark transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase mb-1">Adres</div>
                  <p className="text-white font-medium text-sm">
                    İstanbul, Türkiye
                  </p>
                </div>
              </li>
            </ul>

            {/* Working Hours */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border-2 border-accent-yellow/20">
              <div className="text-xs text-gray-400 font-semibold uppercase mb-2">Çalışma Saatleri</div>
              <div className="text-white text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Pazartesi - Cuma:</span>
                  <span className="font-bold text-accent-yellow">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi:</span>
                  <span className="font-bold text-accent-yellow">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar:</span>
                  <span className="font-bold text-gray-400">Kapalı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t-2 border-accent-yellow/30 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              &copy; {currentYear} <span className="font-bold text-accent-yellow">New Holland Yedek Parça Bayi</span>. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition">
                Gizlilik Politikası
              </Link>
              <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition">
                Kullanım Şartları
              </Link>
              <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Yellow Border */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-accent-yellow"></div>
    </footer>
  );
}
