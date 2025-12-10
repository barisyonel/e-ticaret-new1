'use client';

import { useState } from 'react';
// Yeni action'ı import ediyoruz
import { createCategoryAction } from '@/app/server-actions/categoryActions'; 
import Link from 'next/link';
import { generateSlug } from '@/lib/utils/slug';
import ImageUpload from '@/components/ImageUpload';
// Repository'den gelen Category tipini kullanmaya devam ediyoruz
import { Category } from '@/lib/repositories/CategoryRepository';

interface CategoryFormProps {
  categories: Category[];
}

export default function CategoryForm({ categories }: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State yönetimleri aynen kalıyor
  const [image, setImage] = useState<string | null>(null);
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [parentId, setParentId] = useState<number | null>(null);

  // Kategorileri düzleştirme (Dropdown için)
  const flattenCategories = (cats: Category[], level: number = 0): Array<Category & { level: number; displayName: string }> => {
    let result: Array<Category & { level: number; displayName: string }> = [];
    cats.forEach((cat) => {
      result.push({ ...cat, level, displayName: '  '.repeat(level) + cat.name });
      if (cat.children && cat.children.length > 0) {
        result = result.concat(flattenCategories(cat.children, level + 1));
      }
    });
    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Resim varsa FormData'ya ekliyoruz (Server Action bunu yakalayacak)
      if (image) {
        formData.set('image', image);
      }

      // ParentId varsa ekliyoruz
      if (parentId) {
        formData.set('parentId', parentId.toString());
      }

      // Checkbox işaretli değilse FormData'ya 'off' olarak bile gitmeyebilir,
      // ama HTML form davranışı gereği server action'da kontrol ediyoruz.
      // Sadece emin olmak için isActive'i manuel set etmeye gerek yok, input name="isActive" yeterli.

      // 🔥 Server Action'ı çağırıyoruz
      // İlk parametre null (prevState), ikincisi formData
      const result = await createCategoryAction(null, formData);

      // Başarısız olursa hatayı göster
      if (result && !result.success) {
        setError(result.message || 'Kategori oluşturulurken bir hata oluştu');
      } 
      
      // Not: Başarılı olursa Server Action içinde "redirect" olduğu için
      // sayfa otomatik olarak yönlendirilecek. Burada router.push yapmana gerek yok.

    } catch (err) {
      // Eğer Server Action redirect yaparsa bazen Next.js bunu hata gibi fırlatabilir.
      // Ancak genellikle client-side try-catch bunu yutmazsa sayfa değişir.
      // Basit bir hata yakalama:
      setError(err instanceof Error ? err.message : 'Beklenmedik bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const flatCategories = flattenCategories(categories);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Form Alanları Aynen Kalıyor */}
      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Kategori Adı *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => {
            if (!isSlugManual) {
              const autoSlug = generateSlug(e.target.value);
              setSlug(autoSlug);
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-gray-700 font-medium mb-2">
          Slug (URL) *
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setIsSlugManual(true);
          }}
          pattern="[a-z0-9-]+"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
        />
        <p className="text-xs text-gray-500 mt-1">
          Sadece küçük harf, rakam ve tire kullanılabilir
        </p>
      </div>

      <div>
        <label htmlFor="parentId" className="block text-gray-700 font-medium mb-2">
          Üst Kategori (Opsiyonel)
        </label>
        <select
          id="parentId"
          name="parentId"
          value={parentId || ''}
          onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value, 10) : null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
        >
          <option value="">Ana Kategori (Üst kategori yok)</option>
          {flatCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.displayName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Kategori Görseli (Opsiyonel)
        </label>
        <ImageUpload
          images={image ? [image] : []}
          onImagesChange={(images) => {
            setImage(images.length > 0 ? images[0] : null);
          }}
          maxImages={1}
          folder="categories"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          defaultChecked
          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
          Aktif (Kategori sitede görünsün)
        </label>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-pink-600 hover:bg-pink-700 text-white'
          }`}
        >
          {isSubmitting ? 'Oluşturuluyor...' : 'Kategori Oluştur'}
        </button>
        <Link
          href="/admin/categories"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          İptal
        </Link>
      </div>
    </form>
  );
}