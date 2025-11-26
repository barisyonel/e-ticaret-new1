export const dynamic = 'force-dynamic';

export default function HakkimizdaPage() {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Hakkımızda</h1>
      
      <div className="w-full max-w-none mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">New Holland Yedek Parça Bayi</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            New Holland Yedek Parça Bayi olarak, tarım makineleri sektöründe 
            müşterilerimize en kaliteli yedek parça ve aksesuar çözümlerini sunmayı 
            hedefleyen güvenilir bir kuruluşuz. Yılların deneyimi ve sektördeki 
            uzmanlığımızla, tarım makinelerinizin performansını en üst seviyede 
            tutmanız için gerekli tüm parçaları temin ediyoruz.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Deneyimli ve profesyonel ekibimizle, müşteri memnuniyetini ön planda tutarak 
            7/24 hizmet vermekteyiz. Orijinal New Holland parçaları ve uyumlu alternatif 
            ürünlerle geniş bir ürün yelpazesi sunuyoruz.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Vizyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Türkiye'nin en güvenilir ve kaliteli tarım makineleri yedek parça 
                bayisi olmak. Teknoloji ve inovasyonu takip ederek, müşterilerimize 
                en iyi hizmeti sunmak.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600">Misyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Müşterilerimize orijinal New Holland yedek parçaları ve profesyonel 
                hizmetle ihtiyaçlarını karşılamalarını sağlamak. Kaliteli ürün ve 
                hızlı teslimatla tarımsal verimliliğe katkıda bulunmak.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Hizmetlerimiz</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🚜</div>
                <h4 className="font-medium mb-2">Orijinal Yedek Parçalar</h4>
                <p className="text-sm text-gray-600">New Holland orijinal parçaları</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🔧</div>
                <h4 className="font-medium mb-2">Teknik Destek</h4>
                <p className="text-sm text-gray-600">Uzman ekibimizden teknik yardım</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🚚</div>
                <h4 className="font-medium mb-2">Hızlı Teslimat</h4>
                <p className="text-sm text-gray-600">Türkiye geneli hızlı kargo</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Neden Bizi Tercih Etmelisiniz?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Orijinal ve garantili ürünler</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Rekabetçi fiyatlar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Hızlı ve güvenli teslimat</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Profesyonel müşteri hizmetleri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Geniş ürün yelpazesi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Uzman teknik destek</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">İletişim Bilgileri</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-2">
                  <strong>Adres:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Telefon:</strong> +90 530 112 94 40
                </p>
                <p className="text-gray-600">
                  <strong>E-posta:</strong> takasan97@gmail.com
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">
                  <strong>Çalışma Saatleri:</strong>
                </p>
                <p className="text-gray-600 mb-1">Pazartesi - Cuma: 08:00 - 18:00</p>
                <p className="text-gray-600 mb-1">Cumartesi: 09:00 - 16:00</p>
                <p className="text-gray-600">Pazar: Kapalı</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

