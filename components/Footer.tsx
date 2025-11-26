import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-blue-dark text-white mt-20 relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-accent-yellow"></div>
      <div className="container mx-auto px-4 py-12 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-accent-yellow mb-4">New Holland Yedek Parça Bayi</h3>
            <p className="text-gray-300 leading-relaxed">
              Kaliteli yedek parça ve aksesuar çözümleri sunuyoruz.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li><Link href="/hakkimizda" className="text-gray-400 hover:text-accent-yellow">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-accent-yellow">İletişim</Link></li>
              <li><Link href="/teslimat-iade" className="text-gray-400 hover:text-accent-yellow">Teslimat ve İade</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Yasal</h4>
            <ul className="space-y-2">
              <li><Link href="/gizlilik-sozlesmesi" className="text-gray-400 hover:text-accent-yellow">Gizlilik Sözleşmesi</Link></li>
              <li><Link href="/mesafeli-satis-sozlesmesi" className="text-gray-400 hover:text-accent-yellow">Mesafeli Satış Sözleşmesi</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Tel: +90 530 112 94 40</li>
              <li>Email: takasan97@gmail.com</li>
              <li>Adres: Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t-2 border-accent-yellow mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">&copy; 2024 New Holland Yedek Parça Bayi. Tüm hakları saklıdır.</p>
            
            {/* Payment Logos */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Güvenli Ödeme:</span>
              <div className="flex items-center space-x-3">
                <img src="/visa-logo.svg" alt="Visa" className="h-6" />
                <img src="/mastercard-logo.svg" alt="MasterCard" className="h-6" />
                <img src="/iyzico-ile-ode.svg" alt="iyzico ile Öde" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

