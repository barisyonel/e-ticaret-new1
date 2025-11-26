export const dynamic = 'force-dynamic';

export default function TeslimatIadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Teslimat ve İade Şartları</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Siparişlerinizin teslimatı ve iade süreçleri hakkında detaylı bilgiler. 
            Müşteri memnuniyeti önceliğimizdir.
          </p>
          <div className="mt-6 text-sm text-gray-500 bg-gray-100 rounded-lg p-3 inline-block">
            <strong>Son Güncelleme:</strong> 26 Kasım 2024
          </div>
        </div>

        {/* Content */}
        <div className="w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Teslimat Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Teslimat Şartları</h2>
                    <p className="text-green-100">Hızlı ve güvenli teslimat</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Teslimat Süreleri */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Teslimat Süreleri
                  </h3>
                  <div className="space-y-3">
                    {[
                      { type: "Stokta bulunan ürünler", time: "1-3 iş günü", icon: "⚡", color: "green" },
                      { type: "Stokta bulunmayan ürünler", time: "5-10 iş günü", icon: "📦", color: "blue" },
                      { type: "Özel sipariş ürünleri", time: "15-30 iş günü", icon: "🔧", color: "orange" },
                      { type: "Yurt dışı temin", time: "20-45 iş günü", icon: "🌍", color: "purple" }
                    ].map((item, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 bg-${item.color}-50 rounded-xl border border-${item.color}-200`}>
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{item.icon}</span>
                          <span className="font-medium text-gray-900">{item.type}</span>
                        </div>
                        <span className={`text-${item.color}-600 font-semibold bg-${item.color}-100 px-3 py-1 rounded-full text-sm`}>
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teslimat Ücretleri */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Teslimat Ücretleri
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-3xl mb-2">🎉</div>
                        <h4 className="font-semibold text-green-600">500 TL ve Üzeri</h4>
                        <p className="text-sm text-gray-600">Ücretsiz Kargo</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-3xl mb-2">📦</div>
                        <h4 className="font-semibold text-blue-600">500 TL Altı</h4>
                        <p className="text-sm text-gray-600">25 TL Kargo Ücreti</p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                      <p>• Ağır ve hacimli ürünlerde özel kargo ücreti uygulanır</p>
                      <p>• Tokat ili içi teslimatlar ücretsizdir</p>
                    </div>
                  </div>
                </div>

                {/* Kargo Firmaları */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Kargo Firmaları
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Aras Kargo", "MNG Kargo", "Yurtiçi Kargo", "PTT Kargo"].map((cargo, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">{cargo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* İade Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 text-white">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">İade Şartları</h2>
                    <p className="text-red-100">14 gün iade garantisi</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                {/* İade Süresi */}
                <div>
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 mb-2">14 Gün</h3>
                    <p className="text-red-800">İade Süresi</p>
                    <p className="text-sm text-red-700 mt-2">Teslim aldığınız tarihten itibaren</p>
                  </div>
                </div>

                {/* İade Koşulları */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    İade Koşulları
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Ürün orijinal ambalajında ve hasarsız olmalı",
                      "Kullanılmamış ve etiketleri çıkarılmamış olmalı",
                      "Fatura ve garanti belgesi eksiksiz olmalı",
                      "Hijyen ürünleri iade edilemez",
                      "Özel sipariş ürünler iade edilemez"
                    ].map((condition, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* İade Süreci */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    İade Süreci
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: "İletişim", desc: "Müşteri hizmetlerimizle iletişime geçin" },
                      { step: 2, title: "Talep", desc: "İade talebinizi belirtin ve sebep açıklayın" },
                      { step: 3, title: "Kod", desc: "İade kodu alın" },
                      { step: 4, title: "Kargo", desc: "Ürünü orijinal ambalajında kargoya verin" },
                      { step: 5, title: "İade", desc: "3-5 iş günü içinde ödeme iadeniz yapılır" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mr-4 font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* İade Ücretleri */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    İade Ücretleri
                  </h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                      <span className="font-medium text-gray-900">Müşteri kaynaklı iadeler</span>
                      <span className="text-red-600 font-semibold">Müşteri öder</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                      <span className="font-medium text-gray-900">Hatalı/kusurlu ürün</span>
                      <span className="text-green-600 font-semibold">Firmamız öder</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <span className="font-medium text-gray-900">Değişim durumu</span>
                      <span className="text-blue-600 font-semibold">Karşılıklı</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-primary-blue to-primary-blue-light rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Yardıma mı İhtiyacınız Var?</h2>
              <p className="text-white/90 text-lg">
                Teslimat ve iade konularında sorularınız için bizimle iletişime geçin
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Telefon</h3>
                <p className="text-white/90">+90 530 112 94 40</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">E-posta</h3>
                <p className="text-white/90">takasan97@gmail.com</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Çalışma Saatleri</h3>
                <p className="text-white/90 text-sm">
                  Pazartesi-Cuma: 08:00-18:00<br />
                  Cumartesi: 09:00-16:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}