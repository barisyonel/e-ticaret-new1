import Link from 'next/link';

export default function Hero() {
  return (
    // DEĞİŞİKLİK: 'mx-4', 'mt-6' ve 'rounded-xl' sınıfları kaldırıldı.
    // 'w-full' eklendi (tam genişlik için garanti olsun diye).
    <section className="relative w-full bg-blue-900 text-white overflow-hidden min-h-[500px] flex items-center border-b-8 border-yellow-400">
      {/* Arkaplan Deseni */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800 via-blue-900 to-black opacity-90 z-10" />

      {/* İçerik Alanı (Container ile ortalanmış ve padding verilmiş) */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div className="max-w-3xl py-12 md:py-0"> {/* Mobilde dikey boşluk eklendi */}
          <span className="inline-block py-2 px-4 rounded-md bg-yellow-400 text-blue-900 text-sm font-bold mb-6 tracking-wide uppercase shadow-lg">
            🔧 Yetkili Yedek Parça Bayisi
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase">
            New Holland <br />
            <span className="text-yellow-400">Gücü Asla Durmasın</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl font-medium">
            Traktörünüzün performansını koruyun. %100 orijinal motor, şanzıman ve kaporta parçaları en uygun fiyatlarla kapınızda.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-yellow-400/50 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span>🔍</span> Parça Ara
            </Link>
            <Link
              href="/categories"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-bold transition-all backdrop-blur-sm"
            >
              Kategoriler
            </Link>
          </div>
        </div>

        {/* Dekoratif Çark İkonu (Mobilde gizli) */}
        <div className="hidden md:block absolute right-0 bottom-0 opacity-10 pointer-events-none">
           <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" className="text-white transform translate-x-1/4 translate-y-1/4">
             <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.04 4.95,18.95L7.44,17.95C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
           </svg>
        </div>
      </div>
    </section>
  );
}