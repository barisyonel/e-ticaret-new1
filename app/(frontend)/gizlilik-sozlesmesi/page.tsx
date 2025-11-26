export const dynamic = 'force-dynamic';

export default function GizlilikSozlesmesiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Gizlilik Sözleşmesi</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          
          {/* Giriş */}
          <section className="mb-8">
            <p className="text-gray-600 mb-4">
              Bu Gizlilik Sözleşmesi, New Holland Yedek Parça Bayi ("Şirket", "biz", "bizim") 
              tarafından işletilen web sitesi ve hizmetleri kullanırken kişisel verilerinizin 
              nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi vermektedir.
            </p>
            <p className="text-gray-600 mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, 
              kişisel verilerinizin işlenmesine ilişkin aydınlatma yükümlülüğümüzü 
              yerine getirmek amacıyla hazırlanmıştır.
            </p>
          </section>

          {/* Veri Sorumlusu */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">1. Veri Sorumlusu</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-2"><strong>Şirket Unvanı:</strong> barış can yönel</p>
              <p className="text-gray-600 mb-2"><strong>Adres:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</p>
              <p className="text-gray-600 mb-2"><strong>Telefon:</strong> +90 530 112 94 40</p>
              <p className="text-gray-600"><strong>E-posta:</strong> takasan97@gmail.com</p>
            </div>
          </section>

          {/* Toplanan Veriler */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">2. Toplanan Kişisel Veriler</h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Kimlik Bilgileri</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Ad, soyad</li>
                <li>T.C. kimlik numarası (gerekli durumlarda)</li>
                <li>Doğum tarihi</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">İletişim Bilgileri</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>E-posta adresi</li>
                <li>Telefon numarası</li>
                <li>Adres bilgileri</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Finansal Bilgiler</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Ödeme bilgileri (güvenli ödeme sistemleri aracılığıyla)</li>
                <li>Fatura bilgileri</li>
                <li>Sipariş geçmişi</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Teknik Veriler</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>IP adresi</li>
                <li>Çerez bilgileri</li>
                <li>Tarayıcı bilgileri</li>
                <li>Site kullanım verileri</li>
              </ul>
            </div>
          </section>

          {/* Veri İşleme Amaçları */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Sipariş işlemlerinin gerçekleştirilmesi</li>
              <li>Müşteri hizmetlerinin sunulması</li>
              <li>Ödeme işlemlerinin güvenli şekilde yapılması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Pazarlama faaliyetlerinin yürütülmesi (onay vermeniz halinde)</li>
              <li>Web sitesinin güvenliğinin sağlanması</li>
              <li>İstatistiksel analiz ve raporlama</li>
              <li>Müşteri memnuniyetinin ölçülmesi</li>
            </ul>
          </section>

          {/* Veri İşleme Hukuki Dayanakları */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">4. Veri İşleme Hukuki Dayanakları</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Sözleşmenin kurulması ve ifası</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Açık rıza (pazarlama faaliyetleri için)</li>
              <li>Meşru menfaat (güvenlik ve analiz amaçlı)</li>
            </ul>
          </section>

          {/* Veri Paylaşımı */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">5. Kişisel Verilerin Paylaşılması</h2>
            <p className="text-gray-600 mb-4">
              Kişisel verileriniz aşağıdaki durumlarda üçüncü kişilerle paylaşılabilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Kargo şirketleri (teslimat için)</li>
              <li>Ödeme hizmet sağlayıcıları (iyzico vb.)</li>
              <li>Yasal merciler (yasal zorunluluk halinde)</li>
              <li>Hizmet sağlayıcılar (IT destek, hosting vb.)</li>
              <li>Muhasebe ve hukuk danışmanları</li>
            </ul>
          </section>

          {/* Veri Saklama */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">6. Veri Saklama Süreleri</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Müşteri bilgileri: Hesap kapatıldıktan sonra 3 yıl</li>
              <li>Sipariş bilgileri: Yasal zorunluluk gereği 10 yıl</li>
              <li>Pazarlama verileri: Rıza geri çekilene kadar</li>
              <li>Teknik loglar: 1 yıl</li>
              <li>Çerez verileri: Çerez politikasında belirtilen süreler</li>
            </ul>
          </section>

          {/* Veri Güvenliği */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">7. Veri Güvenliği</h2>
            <p className="text-gray-600 mb-4">
              Kişisel verilerinizin güvenliği için aşağıdaki önlemleri almaktayız:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>SSL sertifikası ile şifreli veri iletimi</li>
              <li>Güvenli sunucu altyapısı</li>
              <li>Erişim kontrolü ve yetkilendirme</li>
              <li>Düzenli güvenlik güncellemeleri</li>
              <li>Veri yedekleme sistemleri</li>
              <li>Personel eğitimleri</li>
            </ul>
          </section>

          {/* Haklar */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">8. Kişisel Veri Sahibinin Hakları</h2>
            <p className="text-gray-600 mb-4">
              KVKK'nın 11. maddesi gereğince aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
              <li>İşleme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>Kişisel verilerin silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme, silme ve yok etme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
            </ul>
          </section>

          {/* Başvuru */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">9. Başvuru Yöntemi</h2>
            <p className="text-gray-600 mb-4">
              Haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-2"><strong>E-posta:</strong> takasan97@gmail.com</p>
              <p className="text-gray-600 mb-2"><strong>Posta:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</p>
              <p className="text-gray-600">
                <strong>Not:</strong> Başvurularınız en geç 30 gün içinde yanıtlanacaktır.
              </p>
            </div>
          </section>

          {/* Çerezler */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">10. Çerezler (Cookies)</h2>
            <p className="text-gray-600 mb-4">
              Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır. 
              Çerez kullanımı hakkında detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.
            </p>
          </section>

          {/* Değişiklikler */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">11. Sözleşme Değişiklikleri</h2>
            <p className="text-gray-600">
              Bu Gizlilik Sözleşmesi gerektiğinde güncellenebilir. Değişiklikler web sitemizde 
              yayınlandığı tarihte yürürlüğe girer. Önemli değişiklikler e-posta ile bildirilecektir.
            </p>
          </section>

          {/* Yürürlük */}
          <section className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Bu Gizlilik Sözleşmesi {new Date().toLocaleDateString('tr-TR')} tarihinde yürürlüğe girmiştir.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
