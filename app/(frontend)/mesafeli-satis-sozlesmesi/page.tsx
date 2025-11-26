export const dynamic = 'force-dynamic';

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-yellow to-accent-yellow-light rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-primary-blue-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Mesafeli Satış Sözleşmesi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Online alışverişinizde güvenliğiniz için hazırlanmış mesafeli satış sözleşmesi ve 
            tüketici haklarınız hakkında detaylı bilgiler.
          </p>
          <div className="mt-6 text-sm text-gray-500 bg-gray-100 rounded-lg p-3 inline-block">
            <strong>Son Güncelleme:</strong> 26 Kasım 2024
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-none mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12 space-y-8">
              
              {/* Section 1 - Taraflar */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">1</span>
                  </div>
                  Sözleşme Tarafları
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                      </svg>
                      SATICI BİLGİLERİ
                    </h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p><strong>Ünvan:</strong> New Holland Yedek Parça Bayi</p>
                      <p><strong>Adres:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</p>
                      <p><strong>Telefon:</strong> +90 530 112 94 40</p>
                      <p><strong>E-posta:</strong> takasan97@gmail.com</p>
                      <p><strong>Web Sitesi:</strong> www.newhollandyedekparca.com</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <h3 className="font-bold text-green-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      ALICI BİLGİLERİ
                    </h3>
                    <div className="space-y-2 text-sm text-green-800">
                      <p>Alıcı bilgileri sipariş sırasında alınacak ve sözleşmenin ayrılmaz parçası olacaktır.</p>
                      <p><strong>Bilgiler:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Ad, Soyad / Ünvan</li>
                        <li>Adres Bilgileri</li>
                        <li>Telefon ve E-posta</li>
                        <li>T.C. Kimlik No / Vergi No</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 - Ürün Bilgileri */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">2</span>
                  </div>
                  Ürün/Hizmet Bilgileri
                </h2>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Satışa konu olan ürün/hizmetlerin temel özellikleri, fiyatları, ödeme ve teslimat koşulları 
                    web sitesinde yer almaktadır. Ürün bilgileri sipariş onayı ile birlikte alıcıya iletilir.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">🚜</div>
                      <h4 className="font-semibold text-gray-900">Yedek Parçalar</h4>
                      <p className="text-sm text-gray-600">Orijinal New Holland parçaları</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">🔧</div>
                      <h4 className="font-semibold text-gray-900">Aksesuarlar</h4>
                      <p className="text-sm text-gray-600">Uyumlu aksesuar ürünleri</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">⚙️</div>
                      <h4 className="font-semibold text-gray-900">Servis</h4>
                      <p className="text-sm text-gray-600">Teknik destek hizmetleri</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 - Cayma Hakkı */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">3</span>
                  </div>
                  Cayma Hakkı
                </h2>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-900 mb-2">14 Gün Cayma Hakkı</h3>
                      <p className="text-red-800 text-sm leading-relaxed">
                        Alıcı, ürünü teslim aldığı tarihten itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin 
                        ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold text-red-900 mb-3">Cayma Hakkı Koşulları:</h4>
                      <ul className="space-y-2 text-sm text-red-800">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-0.5">✓</span>
                          Ürün orijinal ambalajında olmalı
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-0.5">✓</span>
                          Kullanılmamış durumda olmalı
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-0.5">✓</span>
                          Etiketleri zarar görmemiş olmalı
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-0.5">✓</span>
                          İade formu doldurulmalı
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-3">Cayma Hakkı Olmayan Durumlar:</h4>
                      <ul className="space-y-2 text-sm text-red-800">
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2 mt-0.5">✗</span>
                          Özel üretim ürünler
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2 mt-0.5">✗</span>
                          Hijyen açısından uygun olmayan ürünler
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2 mt-0.5">✗</span>
                          Hızla bozulabilen ürünler
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2 mt-0.5">✗</span>
                          Dijital içerikler
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 - Teslimat */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">4</span>
                  </div>
                  Teslimat Koşulları
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Teslimat Süreleri
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• Stokta bulunan ürünler: 1-3 iş günü</li>
                      <li>• Tedarik edilecek ürünler: 5-10 iş günü</li>
                      <li>• Özel sipariş ürünler: 15-30 iş günü</li>
                      <li>• Acil durumlar için aynı gün teslimat (şehir içi)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Teslimat Bölgeleri
                    </h3>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li>• Türkiye geneli kargo teslimatı</li>
                      <li>• Tokat ili içi ücretsiz teslimat</li>
                      <li>• Komşu iller için özel indirim</li>
                      <li>• Yurt dışı teslimat (talep üzerine)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5 - Ödeme */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">5</span>
                  </div>
                  Ödeme Koşulları
                </h2>
                <div className="bg-gradient-to-r from-accent-yellow/10 to-accent-yellow/5 rounded-xl p-6 border border-accent-yellow/30">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-accent-yellow-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Kredi Kartı</h3>
                      <p className="text-sm text-gray-600">Visa, MasterCard ile güvenli ödeme</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-accent-yellow-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Havale/EFT</h3>
                      <p className="text-sm text-gray-600">Banka havalesi ile ödeme</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-accent-yellow-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Kapıda Ödeme</h3>
                      <p className="text-sm text-gray-600">Teslimat sırasında nakit ödeme</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 - Sorumluluklar */}
              <section>
                <h2 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-blue font-bold text-sm">6</span>
                  </div>
                  Tarafların Sorumlulukları
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-3">Satıcının Sorumlulukları:</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• Ürünü zamanında ve eksiksiz teslim etmek</li>
                      <li>• Ürün kalitesini garanti etmek</li>
                      <li>• Müşteri hizmetleri sunmak</li>
                      <li>• Yasal gereklilikleri yerine getirmek</li>
                      <li>• Kişisel verileri korumak</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="font-semibold text-green-900 mb-3">Alıcının Sorumlulukları:</h3>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li>• Doğru bilgi vermek</li>
                      <li>• Ödemeyi zamanında yapmak</li>
                      <li>• Ürünü teslim almak</li>
                      <li>• Sözleşme koşullarına uymak</li>
                      <li>• İade koşullarına riayet etmek</li>
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
                  Sözleşme Hakkında İletişim
                </h2>
                <p className="mb-4 text-white/90">
                  Bu sözleşme hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>E-posta:</strong> takasan97@gmail.com</p>
                    <p><strong>Telefon:</strong> +90 530 112 94 40</p>
                  </div>
                  <div>
                    <p><strong>Adres:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</p>
                    <p><strong>Çalışma Saatleri:</strong> Pazartesi-Cuma 08:00-18:00</p>
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