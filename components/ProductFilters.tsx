'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import Link from 'next/link';

// HATA ÇÖZÜMÜ: Interface'e 'attributes' ve 'brands' eklendi.
// 'any' kullanarak build hatalarını engelliyoruz.
interface ProductFiltersProps {
  categories: any[];
  attributes: any[];
  brands: any[];
  selectedCategory: string;
  selectedFilters: Record<string, string[]>;
}

export default function ProductFilters({
  categories,
  attributes,
  brands,
  selectedCategory,
  selectedFilters
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL'yi güncelleme fonksiyonu
  const updateFilter = useCallback((key: string, value: string, checked: boolean) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    // Mevcut değerleri al
    const currentValues = current.get(key)?.split(',') || [];
    
    let newValues;
    if (checked) {
      // Ekle
      if (!currentValues.includes(value)) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues;
      }
    } else {
      // Çıkar
      newValues = currentValues.filter((v) => v !== value);
    }

    // URL'yi güncelle
    if (newValues.length > 0) {
      current.set(key, newValues.join(','));
    } else {
      current.delete(key);
    }
    
    // Sayfa numarasını sıfırla
    current.delete('page');

    // Yönlendir
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/products${query}`);
  }, [searchParams, router]);

  return (
    <div className="space-y-8">
      {/* Kategoriler */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          Kategoriler
        </h3>
        <ul className="space-y-3 font-medium text-gray-600">
          <li>
            <Link 
              href="/products" 
              className={`block hover:text-pink-600 ${!selectedCategory ? 'text-pink-600 font-bold' : ''}`}
            >
              Tüm Ürünler
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/products?category=${cat.slug}`}
                className={`block hover:text-pink-600 ${selectedCategory === cat.slug ? 'text-pink-600 font-bold' : ''}`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Markalar */}
      {brands && brands.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
            Markalar
          </h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  // Not: Backend yapısına göre burası düzenlenebilir
                />
                <span className="text-gray-600 group-hover:text-gray-900">{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Dinamik Özellikler (Attributes) */}
      {attributes && attributes.map((attr) => (
        <div key={attr.id}>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
            {attr.name}
          </h3>
          <div className="space-y-2">
            {attr.values && attr.values.map((val: any) => {
              const paramName = `attr_${attr.id}`;
              const isChecked = selectedFilters[attr.id]?.includes(String(val.id));
              
              return (
                <label key={val.id} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isChecked || false}
                    onChange={(e) => updateFilter(paramName, String(val.id), e.target.checked)}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-gray-600 group-hover:text-gray-900">
                    {val.name}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}