export const dynamic = 'force-dynamic';

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Mesafeli Satış Sözleşmesi</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          
          {/* Giriş */}
          <section className="mb-8">
            <p className="text-gray-600 mb-4">
              Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve 
              Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince düzenlenmiştir.
            </p>
          </section>

          {/* Taraflar */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">1. TARAFLAR</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">SATICI BİLGİLERİ</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-2"><strong>Unvan:</strong> barış can yönel</p>
                <p className="text-gray-600 mb-2"><strong>Adres:</strong> Tokat merkez karşıyaka mahallesi 60100 Tokat / Türkiye</p>
                <p className="text-gray-600 mb-2"><strong>Telefon:</strong> +90 530 112 94 40</p>
                <p className="text-gray-600 mb-2"><strong>E-posta:</strong> takasan97@gmail.com</p>
                <p className="text-gray-600"><strong>Faaliyet Konusu:</strong> New Holland Yedek Parça Satışı</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">ALICI BİLGİLERİ</h3>
              <p className="text-gray-600">
                Sipariş sırasında kayıt olunan kişi bilgileri geçerlidir.
              </p>
            </div>
          </section>

          {/* Konu */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">2. SÖZLEŞME KONUSU</h2>
            <p className="text-gray-600 mb-4">
              İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesi üzerinden 
              elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı 
              belirtilen ürün/ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı 
              Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği 
              hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
            </p>
          </section>

          {/* Ürün Bilgileri */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">3. ÜRÜN BİLGİLERİ</h2>
            <p className="text-gray-600 mb-4">
              Satışa konu ürün/ürünlerin temel nitelikleri (türü, miktarı, marka/modeli, 
              rengi, adedi) SATICI'ya ait internet sitesinde yer almaktadır. 
              Kampanya döneminde ürün fiyatları SATICI tarafından belirtilen süre sonunda 
              değişebilir.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-800">
                <strong>Önemli:</strong> Ürün bilgileri sipariş onayı ile birlikte 
                e-posta adresinize gönderilecektir.
              </p>
            </div>
          </section>

          {/* Fiyat ve Ödeme */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">4. FİYAT VE ÖDEME KOŞULLARI</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Fiyat Bilgileri</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Ürün fiyatları KDV dahildir</li>
                <li>Kargo ücreti ayrıca belirtilir</li>
                <li>500 TL ve üzeri siparişlerde kargo ücretsizdir</li>
                <li>Fiyatlar sipariş anındaki geçerli fiyatlardır</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Ödeme Yöntemleri</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Kredi kartı (Visa, MasterCard, American Express)</li>
                <li>Banka kartı</li>
                <li>Havale/EFT</li>
                <li>iyzico ile güvenli ödeme</li>
                <li>Kapıda ödeme (seçili bölgelerde)</li>
              </ul>
            </div>
          </section>

          {/* Teslimat */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">5. TESLİMAT KOŞULLARI</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Teslimat Süreleri</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Stokta bulunan ürünler: 1-3 iş günü</li>
                <li>Stokta bulunmayan ürünler: 5-10 iş günü</li>
                <li>Özel sipariş ürünleri: 15-30 iş günü</li>
                <li>Teslimat süresi, ödemenin onaylanmasından sonra başlar</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Teslimat Şartları</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Ürünler belirtilen adrese kargo ile gönderilir</li>
                <li>Teslim sırasında kimlik kontrolü yapılabilir</li>
                <li>Ürün hasarlı ise teslim alınmamalıdır</li>
                <li>Teslim alınamayan ürünler kargo firmasında 15 gün bekletilir</li>
              </ul>
            </div>
          </section>

          {/* Cayma Hakkı */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">6. CAYMA HAKKI</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Cayma Süresi</h3>
              <p className="text-gray-600 mb-4">
                ALICI, ürünü teslim aldığı tarihten itibaren 14 (on dört) gün içinde 
                herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden 
                cayma hakkına sahiptir.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Cayma Hakkının Kullanımı</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Cayma hakkının kullanılması için yazılı bildirim yapılmalıdır</li>
                <li>Ürün orijinal ambalajında ve hasarsız olarak iade edilmelidir</li>
                <li>Fatura ve varsa garanti belgesi eksiksiz olmalıdır</li>
                <li>İade kargo ücreti ALICI'ya aittir (kusurlu ürün hariç)</li>
              </ol>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Cayma Hakkının Kullanılamadığı Durumlar</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Özel sipariş üzerine üretilen ürünler</li>
                <li>Hijyen açısından iade edilmesi uygun olmayan ürünler</li>
                <li>Ambalajı açıldıktan sonra sağlık ve hijyen açısından iade edilemeyecek ürünler</li>
                <li>Teslimden sonra başka ürünlerle karışan ürünler</li>
              </ul>
            </div>
          </section>

          {/* Garanti */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">7. GARANTİ KOŞULLARI</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Ürünler üretici firma garantisi altındadır</li>
              <li>Garanti süresi ürün özelliklerine göre değişir</li>
              <li>Garanti kapsamındaki arızalar ücretsiz onarılır</li>
              <li>Garanti belgesi fatura ile birlikte gönderilir</li>
              <li>Garanti şartları üretici firma koşullarına tabidir</li>
            </ul>
          </section>

          {/* Yükümlülükler */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">8. TARAFLARIN YÜKÜMLÜLÜKLERİ</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">SATICI'nın Yükümlülükleri</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Ürünü sözleşme şartlarına uygun olarak teslim etmek</li>
                <li>Yasal garanti yükümlülüklerini yerine getirmek</li>
                <li>Cayma hakkı bilgilendirmesini yapmak</li>
                <li>İade ve değişim işlemlerini gerçekleştirmek</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">ALICI'nın Yükümlülükleri</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Sipariş bedelini zamanında ödemek</li>
                <li>Doğru teslimat bilgilerini vermek</li>
                <li>Ürünü teslim almak</li>
                <li>Sözleşme şartlarına uymak</li>
              </ul>
            </div>
          </section>

          {/* Mücbir Sebepler */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">9. MÜCBİR SEBEPLER</h2>
            <p className="text-gray-600">
              Doğal afet, savaş, terör, grev, lokavt, pandemi gibi mücbir sebep hallerde 
              taraflar yükümlülüklerinden geçici olarak muaf tutulur. Bu durumda sözleşme 
              askıya alınır ve taraflar karşılıklı olarak zarar ziyan talebinde bulunamaz.
            </p>
          </section>

          {/* Uyuşmazlık Çözümü */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">10. UYUŞMAZLIK ÇÖZÜMÜ</h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-3">Şikayetler</h3>
              <p className="text-gray-600 mb-4">
                Şikayetlerinizi aşağıdaki kanallardan iletebilirsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Telefon: +90 530 112 94 40</li>
                <li>E-posta: takasan97@gmail.com</li>
                <li>Tüketici Hakem Heyetleri</li>
                <li>Tüketici Mahkemeleri</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800">
                <strong>Tüketici Hakem Heyeti:</strong> Satın alınan ürün veya hizmetin 
                değerinin 2023 yılı için 11.500 TL'nin altında olması durumunda il/ilçe 
                tüketici hakem heyetlerine, 11.500 TL'nin üzerinde olması durumunda 
                tüketici mahkemelerine başvurulabilir.
              </p>
            </div>
          </section>

          {/* Yürürlük */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">11. YÜRÜRLÜK</h2>
            <p className="text-gray-600">
              İşbu sözleşme, ALICI tarafından elektronik ortamda onaylanması ile 
              yürürlüğe girer. SATICI, sipariş öncesinde işbu sözleşme hükümlerini 
              ALICI'ya okutup, onay aldıktan sonra siparişi gerçekleştirir.
            </p>
          </section>

          {/* Onay */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">SÖZLEŞME ONAYI</h2>
            <p className="text-gray-600 mb-4">
              Bu sözleşmeyi okudum, anladım ve kabul ediyorum. Sipariş vermekle 
              bu sözleşme hükümlerini kabul etmiş sayılırım.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><strong>Sözleşme Tarihi:</strong> Sipariş tarihi</p>
                <p><strong>SATICI:</strong> barış can yönel</p>
              </div>
              <div>
                <p><strong>ALICI:</strong> Sipariş veren kişi</p>
                <p><strong>İmza:</strong> Elektronik onay</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
