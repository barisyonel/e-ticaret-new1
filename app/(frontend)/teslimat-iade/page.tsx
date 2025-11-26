export const dynamic = 'force-dynamic';

export default function TeslimatIadePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Teslimat ve İade Şartları</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          
          {/* Teslimat Şartları */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Teslimat Şartları</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">Teslimat Süreleri</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Stokta bulunan ürünler: 1-3 iş günü</li>
                <li>Stokta bulunmayan ürünler: 5-10 iş günü</li>
                <li>Özel sipariş ürünleri: 15-30 iş günü</li>
                <li>Yurt dışından temin edilecek ürünler: 20-45 iş günü</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">Teslimat Ücretleri</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>500 TL ve üzeri siparişlerde kargo ücretsizdir</li>
                <li>500 TL altı siparişlerde kargo ücreti 25 TL'dir</li>
                <li>Ağır ve hacimli ürünlerde özel kargo ücreti uygulanır</li>
                <li>Aynı gün teslimat hizmeti İstanbul içi için mevcuttur (ek ücret karşılığı)</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">Teslimat Alanları</h3>
              <p className="text-gray-600 mb-2">
                Türkiye'nin tüm illerine teslimat yapılmaktadır. Kargo firmaları:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Aras Kargo</li>
                <li>MNG Kargo</li>
                <li>Yurtiçi Kargo</li>
                <li>PTT Kargo</li>
              </ul>
            </div>
          </section>

          {/* İade Şartları */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">İade Şartları</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">İade Süresi</h3>
              <p className="text-gray-600 mb-4">
                Ürünlerinizi teslim aldığınız tarihten itibaren 14 gün içerisinde iade edebilirsiniz.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">İade Koşulları</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Ürün orijinal ambalajında ve hasarsız olmalıdır</li>
                <li>Ürün kullanılmamış ve etiketleri çıkarılmamış olmalıdır</li>
                <li>Fatura ve garanti belgesi eksiksiz olmalıdır</li>
                <li>Hijyen açısından iade edilemeyen ürünler (iç çamaşırı, kozmetik vb.) iade edilemez</li>
                <li>Özel sipariş üzerine üretilen ürünler iade edilemez</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">İade Süreci</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Müşteri hizmetlerimizle iletişime geçin</li>
                <li>İade talebinizi belirtin ve sebep açıklayın</li>
                <li>İade kodu alın</li>
                <li>Ürünü orijinal ambalajında kargoya verin</li>
                <li>İade onaylandıktan sonra 3-5 iş günü içinde ödeme iadeniz yapılır</li>
              </ol>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">İade Ücreti</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Müşteri kaynaklı iadeler: Kargo ücreti müşteriye aittir</li>
                <li>Hatalı/kusurlu ürün iadesi: Kargo ücreti firmamıza aittir</li>
                <li>Değişim durumunda: Gidiş kargo ücreti müşteriye, geliş ücreti firmamıza aittir</li>
              </ul>
            </div>
          </section>

          {/* İletişim Bilgileri */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">İletişim Bilgileri</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Müşteri Hizmetleri</h4>
                <p className="text-gray-600">Telefon: +90 530 112 94 40</p>
                <p className="text-gray-600">E-posta: takasan97@gmail.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Çalışma Saatleri</h4>
                <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                <p className="text-gray-600">Cumartesi: 09:00 - 16:00</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
