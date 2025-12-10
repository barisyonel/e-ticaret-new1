export function FeaturesBar() {
  const features = [
    { icon: '🚜', title: 'Birebir Uyum', desc: 'Traktörünüz için tam uyumlu parçalar' },
    { icon: '🛡️', title: 'Orijinal Garanti', desc: '%100 Orijinal New Holland ürünleri' },
    { icon: '📦', title: 'Hızlı Kargo', desc: 'Saat 15:00\'e kadar aynı gün kargo' },
    { icon: '💳', title: 'Güvenli Ödeme', desc: 'Kurumsal fatura ve güvenli altyapı' },
  ];

  return (
    <section className="bg-blue-900 text-white py-12 border-b-4 border-yellow-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
              <div className="text-4xl">{feature.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-yellow-400 mb-1">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Diğer bölümleri şimdilik boşaltabiliriz veya sadece FeaturesBar kullanabiliriz
export function StatsSection() { return null; }
export function ServicesSection() { return null; }
export function CTASection() { return null; }