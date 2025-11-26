export const dynamic = 'force-dynamic';

export default function GizlilikSozlesmesiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-blue-light rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Gizlilik Sözleşmesi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kişisel verilerinizin korunması bizim için önemlidir. Bu sözleşme, verilerinizin nasıl toplandığını, 
            kullanıldığını ve korunduğunu açıklamaktadır.
          </p>
          <div className="mt-6 text-sm text-gray-500 bg-gray-100 rounded-lg p-3 inline-block">
            <strong>Son Güncelleme:</strong> 26 Kasım 2024
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-none mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12 space-y-8">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">1</span>
                  </div>
                  Veri Sorumlusu
                </h2>
                <div className="bg-gradient-to-r from-primary-blue/5 to-transparent rounded-xl p-6 border-l-4 border-primary-blue">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Bu gizlilik sözleşmesi kapsamında veri sorumlusu <strong>New Holland Yedek Parça Bayi</strong>'dir.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Adres:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</p>
                      <p><strong>Telefon:</strong> +90 530 112 94 40</p>
                    </div>
                    <div>
                      <p><strong>E-posta:</strong> takasan97@gmail.com</p>
                      <p><strong>Web Sitesi:</strong> www.newhollandyedekparca.com</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">2</span>
                  </div>
                  Toplanan Kişisel Veriler
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Web sitemizi kullanırken aşağıdaki kişisel verilerinizi toplayabiliriz:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Kimlik Bilgileri
                      </h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Ad, soyad</li>
                        <li>• E-posta adresi</li>
                        <li>• Telefon numarası</li>
                        <li>• TC Kimlik numarası (gerektiğinde)</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6">
                      <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        İletişim Bilgileri
                      </h3>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Adres bilgileri</li>
                        <li>• Fatura adresi</li>
                        <li>• Teslimat adresi</li>
                        <li>• İletişim tercihleri</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">3</span>
                  </div>
                  Verilerin Kullanım Amaçları
                </h2>
                <div className="grid gap-4">
                  {[
                    { icon: "🛒", title: "Sipariş İşlemleri", desc: "Siparişlerinizi almak, işlemek ve teslim etmek" },
                    { icon: "📞", title: "İletişim", desc: "Size ulaşmak ve müşteri hizmetleri sunmak" },
                    { icon: "📊", title: "Analiz", desc: "Web site performansını analiz etmek ve geliştirmek" },
                    { icon: "📧", title: "Pazarlama", desc: "İzninizle pazarlama iletişimi yapmak" },
                    { icon: "⚖️", title: "Yasal Yükümlülükler", desc: "Yasal gereklilikleri yerine getirmek" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">4</span>
                  </div>
                  Veri Güvenliği
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Kişisel verilerinizin güvenliği için aşağıdaki önlemleri alıyoruz:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        SSL şifreleme
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Güvenli veri saklama
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Erişim kontrolü
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Düzenli güvenlik güncellemeleri
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Personel eğitimleri
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Veri yedekleme
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">5</span>
                  </div>
                  Haklarınız
                </h2>
                <div className="bg-accent-yellow/10 rounded-xl p-6 border border-accent-yellow/30">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    KVKK kapsamında sahip olduğunuz haklar:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <ul className="space-y-2">
                      <li>• Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                      <li>• İşlenen verileriniz hakkında bilgi talep etme</li>
                      <li>• İşleme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>• Verilerinizin düzeltilmesini veya silinmesini talep etme</li>
                      <li>• İşleme faaliyetine itiraz etme</li>
                      <li>• Zararınız varsa tazminat talep etme</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gradient-to-r from-primary-blue to-primary-blue-light rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  İletişim
                </h2>
                <p className="mb-4 text-white/90">
                  Gizlilik sözleşmesi hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>E-posta:</strong> takasan97@gmail.com</p>
                    <p><strong>Telefon:</strong> +90 530 112 94 40</p>
                  </div>
                  <div>
                    <p><strong>Adres:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}