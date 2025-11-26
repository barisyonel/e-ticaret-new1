export const dynamic = 'force-dynamic';

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">KVKK Aydınlatma Metni</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin 
            işlenmesi hakkında aydınlatma metni.
          </p>
          <div className="mt-6 text-sm text-gray-500 bg-gray-100 rounded-lg p-3 inline-block">
            <strong>Son Güncelleme:</strong> 26 Kasım 2024
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-none mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12 space-y-8">
              
              {/* Section 1 - Veri Sorumlusu */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  Veri Sorumlusu Kimliği
                </h2>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, 
                    kişisel verileriniz veri sorumlusu sıfatıyla <strong>New Holland Yedek Parça Bayi</strong> 
                    tarafından aşağıda açıklanan kapsamda işlenmektedir.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">İletişim Bilgileri</h4>
                      <p><strong>Adres:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</p>
                      <p><strong>Telefon:</strong> +90 530 112 94 40</p>
                      <p><strong>E-posta:</strong> takasan97@gmail.com</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Faaliyet Alanı</h4>
                      <p>Tarım makineleri yedek parça satışı ve teknik destek hizmetleri</p>
                      <p><strong>Web Sitesi:</strong> www.newhollandyedekparca.com</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 - İşlenen Veriler */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  İşlenen Kişisel Veri Kategorileri
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-bold text-blue-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Kimlik Bilgileri
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• Ad, soyad</li>
                      <li>• T.C. Kimlik Numarası</li>
                      <li>• Doğum tarihi</li>
                      <li>• Cinsiyet</li>
                      <li>• Fotoğraf (gerektiğinde)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      İletişim Bilgileri
                    </h3>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li>• Telefon numarası</li>
                      <li>• E-posta adresi</li>
                      <li>• Adres bilgileri</li>
                      <li>• Faks numarası</li>
                      <li>• İletişim tercihleri</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <h3 className="font-bold text-orange-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Finansal Bilgiler
                    </h3>
                    <ul className="space-y-2 text-sm text-orange-800">
                      <li>• Banka hesap bilgileri</li>
                      <li>• Kredi kartı bilgileri</li>
                      <li>• Fatura bilgileri</li>
                      <li>• Ödeme geçmişi</li>
                      <li>• Vergi numarası</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h3 className="font-bold text-red-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Dijital İz Bilgileri
                    </h3>
                    <ul className="space-y-2 text-sm text-red-800">
                      <li>• IP adresi</li>
                      <li>• Çerez bilgileri</li>
                      <li>• Tarayıcı bilgileri</li>
                      <li>• Site kullanım verileri</li>
                      <li>• Konum bilgileri</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 - İşleme Amaçları */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  Kişisel Verilerin İşlenme Amaçları
                </h2>
                <div className="grid gap-4">
                  {[
                    { 
                      icon: "🛒", 
                      title: "Sipariş ve Satış İşlemleri", 
                      desc: "Sipariş alma, işleme, faturalandırma ve teslimat süreçlerinin yürütülmesi",
                      legal: "Sözleşmenin kurulması ve ifası"
                    },
                    { 
                      icon: "📞", 
                      title: "Müşteri Hizmetleri", 
                      desc: "Müşteri destek hizmetleri, şikayet yönetimi ve iletişim faaliyetleri",
                      legal: "Meşru menfaat"
                    },
                    { 
                      icon: "📊", 
                      title: "Analiz ve Raporlama", 
                      desc: "İş geliştirme, pazar araştırması ve performans analizi çalışmaları",
                      legal: "Meşru menfaat"
                    },
                    { 
                      icon: "📧", 
                      title: "Pazarlama Faaliyetleri", 
                      desc: "Ürün tanıtımı, kampanya bilgilendirmeleri ve kişiselleştirilmiş öneriler",
                      legal: "Açık rıza"
                    },
                    { 
                      icon: "⚖️", 
                      title: "Yasal Yükümlülükler", 
                      desc: "Vergi, muhasebe ve diğer yasal gerekliliklerin yerine getirilmesi",
                      legal: "Hukuki yükümlülük"
                    },
                    { 
                      icon: "🔒", 
                      title: "Güvenlik", 
                      desc: "Bilgi güvenliği, dolandırıcılık önleme ve sistem güvenliği sağlanması",
                      legal: "Meşru menfaat"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{item.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-700 text-sm mb-3">{item.desc}</p>
                          <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {item.legal}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4 - Veri Aktarımı */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">4</span>
                  </div>
                  Kişisel Verilerin Aktarılması
                </h2>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde 
                    aşağıdaki taraflarla paylaşılabilir:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-3">Yurt İçi Aktarım:</h4>
                      <ul className="space-y-2 text-sm text-orange-800">
                        <li>• Kargo ve lojistik firmaları</li>
                        <li>• Ödeme hizmet sağlayıcıları</li>
                        <li>• Muhasebe ve hukuk danışmanları</li>
                        <li>• Bilgi işlem hizmet sağlayıcıları</li>
                        <li>• Yetkili kamu kurum ve kuruluşları</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-3">Yurt Dışı Aktarım:</h4>
                      <ul className="space-y-2 text-sm text-orange-800">
                        <li>• Bulut hizmet sağlayıcıları</li>
                        <li>• Uluslararası ödeme sistemleri</li>
                        <li>• Analitik hizmet sağlayıcıları</li>
                        <li>• Yedek parça tedarikçileri</li>
                        <li>• Veri işleme hizmet sağlayıcıları</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 - Haklarınız */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">5</span>
                  </div>
                  KVKK Kapsamındaki Haklarınız
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">Bilgi Alma Hakkı</h4>
                          <p className="text-sm text-blue-800">Kişisel verilerinizin işlenip işlenmediğini öğrenme</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">Erişim Hakkı</h4>
                          <p className="text-sm text-blue-800">İşlenen verileriniz hakkında bilgi talep etme</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">Düzeltme Hakkı</h4>
                          <p className="text-sm text-blue-800">Yanlış verilerin düzeltilmesini talep etme</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">Silme Hakkı</h4>
                          <p className="text-sm text-blue-800">Verilerinizin silinmesini talep etme</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">Aktarım Hakkı</h4>
                          <p className="text-sm text-blue-800">Verilerin kimlerle paylaşıldığını öğrenme</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">İtiraz Hakkı</h4>
                          <p className="text-sm text-blue-800">Veri işleme faaliyetine itiraz etme</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">Otomatik Karar Hakkı</h4>
                          <p className="text-sm text-blue-800">Otomatik sistemlerle alınan kararlara itiraz</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">Tazminat Hakkı</h4>
                          <p className="text-sm text-blue-800">Zararınız varsa tazminat talep etme</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 - Başvuru Yöntemi */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">6</span>
                  </div>
                  Haklarınızı Kullanma Yöntemi
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-green-900 mb-2">E-posta</h4>
                      <p className="text-sm text-green-800">takasan97@gmail.com</p>
                    </div>
                    
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-green-900 mb-2">Telefon</h4>
                      <p className="text-sm text-green-800">+90 530 112 94 40</p>
                    </div>
                    
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-green-900 mb-2">Yazılı Başvuru</h4>
                      <p className="text-sm text-green-800">Tokat merkez karşıyaka mahallesi 60100 Tokat</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">Başvuru Şartları:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Başvuru kimlik bilgileri ile yapılmalıdır</li>
                      <li>• Talep edilen konu açık ve anlaşılır olmalıdır</li>
                      <li>• Başvuru 30 gün içinde cevaplanır</li>
                      <li>• Başvuru ücretsizdir (kopyalama masrafı hariç)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  KVKK Hakkında Sorularınız
                </h2>
                <p className="mb-6 text-white/90">
                  Kişisel verilerinizin korunması konusunda sorularınız için bizimle iletişime geçebilirsiniz. 
                  Uzman ekibimiz size yardımcı olmaktan memnuniyet duyar.
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
