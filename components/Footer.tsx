import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-primary-blue-darker via-primary-blue-dark to-primary-blue-darker text-white mt-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-yellow via-accent-yellow-light to-accent-yellow shadow-lg"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary-blue-darker/50 via-transparent to-transparent"></div>
      
      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-accent-yellow/20 to-accent-yellow/5 rounded-2xl p-3 backdrop-blur-sm border border-accent-yellow/20">
                <span className="text-2xl font-black text-accent-yellow">NH</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white leading-tight">New Holland</h3>
                <p className="text-xs text-accent-yellow/90 font-semibold">Yedek Parça Bayi</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Orijinal New Holland yedek parçaları ve profesyonel servis hizmetleri ile 
              tarımsal verimliliğinize katkıda bulunuyoruz.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-accent-yellow/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-accent-yellow/50 transform hover:scale-110">
                <svg className="w-5 h-5 text-white hover:text-accent-yellow transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-accent-yellow/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-accent-yellow/50 transform hover:scale-110">
                <svg className="w-5 h-5 text-white hover:text-accent-yellow transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-accent-yellow/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-accent-yellow/50 transform hover:scale-110">
                <svg className="w-5 h-5 text-white hover:text-accent-yellow transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-yellow flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Hızlı Linkler
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-accent-yellow transition-all duration-300 flex items-center group">
                  <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-accent-yellow transition-all duration-300 flex items-center group">
                  <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Ürünler
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-accent-yellow transition-all duration-300 flex items-center group">
                  <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/randevu" className="text-gray-300 hover:text-accent-yellow transition-all duration-300 flex items-center group">
                  <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Randevu Al
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Pages */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-yellow flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Yasal Bilgiler
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/gizlilik-sozlesmesi" className="text-gray-300 hover:text-accent-yellow transition-all duration-300 flex items-center group">
                  <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Gizlilik Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/mesafeli-satis-sozlesmesi" className="text-gray-300 hover:text-accent-yellow transition-all duration-300 flex items-center group">
                  <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/teslimat-iade" className="text-gray-300 hover:text-accent-yellow transition-all duration-300 flex items-center group">
                  <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Teslimat ve İade
                </Link>
              </li>
              <li>
                <Link href="/kvkk" className="text-gray-300 hover:text-accent-yellow transition-all duration-300 flex items-center group">
                  <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  KVKK Aydınlatma Metni
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-yellow flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              İletişim Bilgileri
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Telefon</p>
                  <p className="text-white font-semibold">+90 530 112 94 40</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">E-posta</p>
                  <p className="text-white font-semibold">takasan97@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Adres</p>
                  <p className="text-white font-semibold text-sm leading-relaxed">
                    Tokat merkez karşıyaka mahallesi<br />
                    60100 Tokat / Türkiye
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - White/Transparent Background */}
        <div className="border-t border-accent-yellow/50 mt-12 pt-8 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl rounded-t-3xl mx-4 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 px-6 pb-4">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-700 text-sm font-medium">
                &copy; 2024 <span className="text-primary-blue font-bold">New Holland Yedek Parça Bayi</span>. 
                Tüm hakları saklıdır.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Bu site SSL sertifikası ile korunmaktadır.
              </p>
            </div>
            
            {/* Payment Methods - Professional Design */}
            <div className="flex flex-col items-center lg:items-end">
              <div className="text-center lg:text-right">
                <p className="text-sm text-gray-700 font-semibold mb-4">Güvenli Ödeme Seçenekleri</p>
                <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-center lg:justify-end space-x-2 flex-wrap gap-y-2">
                    <div className="flex items-center justify-center w-12 h-7 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <img src="/visa-logo.svg" alt="Visa" className="h-3 w-auto" />
                    </div>
                    <div className="flex items-center justify-center w-12 h-7 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <img src="/mastercard-logo.svg" alt="MasterCard" className="h-2.5 w-auto" />
                    </div>
                    <div className="flex items-center justify-center w-14 h-7 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <span className="text-[10px] font-bold text-blue-600">AMEX</span>
                    </div>
                    <div className="flex items-center justify-center w-12 h-7 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <span className="text-[10px] font-bold text-green-600">TROY</span>
                    </div>
                    <div className="flex items-center justify-center w-28 h-7 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <img src="/iyzico-logo-pack/checkout_iyzico_ile_ode/TR/Tr_Colored/iyzico_ile_ode_colored.png" alt="iyzico ile Öde" className="h-5 w-auto" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 flex items-center justify-center lg:justify-end mt-3 font-medium">
                  <svg className="w-3 h-3 mr-1 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z" clipRule="evenodd" />
                  </svg>
                  SSL Sertifikalı Güvenli Ödeme
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-blue-darker to-transparent opacity-50"></div>
    </footer>
  );
}