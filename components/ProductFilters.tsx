'use client';

import Link from 'next/link';

// Her şeyi kabul eden esnek yapı
export default function ProductFilters({
  categories = [],
  attributes = [],
  brands = [],
  selectedCategory = '',
  selectedFilters = {}
}: any) {

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-3">Kategoriler</h3>
        <ul className="space-y-2">
          <li><Link href="/products" className="hover:text-pink-600">Tümü</Link></li>
          {categories.map((cat: any) => (
            <li key={cat.id}>
              <Link
                href={`/products?category=${cat.slug}`}
                className={selectedCategory === cat.slug ? 'text-pink-600 font-bold' : ''}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {brands.length > 0 && (
        <div>
          <h3 className="font-bold mb-3">Markalar</h3>
          {brands.map((brand: any) => (
            <div key={brand.id} className="flex items-center gap-2 mb-1">
              <input type="checkbox" /> <span>{brand.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
