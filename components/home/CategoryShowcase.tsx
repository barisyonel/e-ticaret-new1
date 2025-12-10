import Link from 'next/link';
import { Category } from '@/lib/repositories/CategoryRepository';

interface Props {
  categories: Category[];
}

export default function CategoryShowcase({ categories }: Props) {
  const mainCategories = categories
    .filter(c => c.parentId === null && c.isActive)
    .slice(0, 12);

  if (mainCategories.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-4 bg-gray-50">
      <div className="flex items-center justify-between mb-10 border-b pb-4 border-gray-200">
        <div>
           <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
             Yedek Parça Kategorileri
           </h2>
           <p className="text-gray-500 text-sm mt-1">İhtiyacınız olan parçayı kategorilere göz atarak bulun</p>
        </div>
        <Link 
          href="/categories" 
          className="text-blue-700 font-bold hover:text-blue-900 hover:underline flex items-center gap-1"
        >
          Tümünü Gör <span>→</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mainCategories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/category/${cat.slug}`}
            className="group block bg-white rounded-lg p-6 text-center border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-600 transition-all duration-300 relative overflow-hidden"
          >
            {/* Hover Efekti için mavi şerit */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-blue-600 transition-colors"></div>

            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              {cat.image ? (
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-contain mix-blend-multiply" 
                />
              ) : (
                // Eğer resim yoksa çark ikonu
                <span className="text-3xl text-gray-400 group-hover:text-blue-600">⚙️</span>
              )}
            </div>
            
            <h3 className="font-bold text-gray-800 text-sm uppercase group-hover:text-blue-700 transition-colors">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}