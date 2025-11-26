import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-blue text-white mt-20 relative shadow-2xl">
      {/* Üst sarı çizgi */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-accent-yellow via-accent-yellow-light to-accent-yellow"></div>
      
      <div className="container mx-auto px-4 py-16 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Şirket Bilgileri */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-accent-yellow mb-6 leading-tight">
              New Holland Yedek Parça Bayi
            </h3>
            <p className="text-blue-100 leading-relaxed text-lg mb-4">
              Kaliteli yedek parça ve aksesuar çözümleri sunuyoruz. 
              Güvenilir hizmet, orijinal parçalar.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <div className="w-12 h-12 bg-accent-yellow rounded-full flex items-center justify-center">
                <span className="text-primary-blue font-bold text-xl">NH</span>
              </div>
              <div>
                <p className="text-accent-yellow font-semibold">7/24 Müşteri Desteği</p>
                <p className="text-blue-200 text-sm">Her zaman yanınızdayız</p>
              </div>
            </div>
          </div>
          
          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-accent-yellow border-b-2 border-accent-yellow pb-2 inline-block">
              Hızlı Linkler
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/hakkimizda" className="text-blue-200 hover:text-accent-yellow transition-all duration-300 hover:translate-x-1 inline-block">
                  📋 Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-blue-200 hover:text-accent-yellow transition-all duration-300 hover:translate-x-1 inline-block">
                  📞 İletişim
                </Link>
              </li>
              <li>
                <Link href="/teslimat-iade" className="text-blue-200 hover:text-accent-yellow transition-all duration-300 hover:translate-x-1 inline-block">
                  🚚 Teslimat ve İade
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Yasal Linkler */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-accent-yellow border-b-2 border-accent-yellow pb-2 inline-block">
              Yasal Bilgiler
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/gizlilik-sozlesmesi" className="text-blue-200 hover:text-accent-yellow transition-all duration-300 hover:translate-x-1 inline-block text-sm">
                  🔒 Gizlilik Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/mesafeli-satis-sozlesmesi" className="text-blue-200 hover:text-accent-yellow transition-all duration-300 hover:translate-x-1 inline-block text-sm">
                  📄 Mesafeli Satış Sözleşmesi
                </Link>
              </li>
            </ul>
            
            {/* İletişim Bilgileri */}
            <div className="mt-8">
              <h5 className="text-lg font-semibold mb-4 text-white">İletişim</h5>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="text-accent-yellow">📱</span>
                  <span>+90 530 112 94 40</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-accent-yellow">✉️</span>
                  <span>takasan97@gmail.com</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-yellow mt-1">📍</span>
                  <span>Tokat merkez karşıyaka mahallesi<br/>60100 Tokat / Türkiye</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Alt Bölüm */}
        <div className="border-t-2 border-accent-yellow mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-blue-100 text-lg font-medium mb-2">
                &copy; 2024 New Holland Yedek Parça Bayi
              </p>
              <p className="text-blue-200 text-sm">
                Tüm hakları saklıdır. Güvenilir parça, kaliteli hizmet.
              </p>
            </div>
            
            {/* Ödeme Logoları */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center mb-4">
                <span className="text-primary-blue font-bold text-lg">Güvenli Ödeme</span>
                <p className="text-primary-blue-light text-sm">SSL Sertifikalı</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <img src="/visa-logo.svg" alt="Visa" className="h-8 hover:scale-110 transition-transform duration-300" />
                <img src="/mastercard-logo.svg" alt="MasterCard" className="h-8 hover:scale-110 transition-transform duration-300" />
                <div className="border-l-2 border-gray-300 h-8 mx-2"></div>
                <img src="/iyzico-ile-ode.svg" alt="iyzico ile Öde" className="h-10 hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="mt-3 text-center">
                <p className="text-primary-blue text-xs">256-bit SSL Şifreleme</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alt Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-yellow via-accent-yellow-light to-accent-yellow"></div>
      </div>
    </footer>
  );
}

