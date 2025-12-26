"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/server-actions/productActions";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slug";

interface ProductFormProps {
  categories: any[];
  attributes: any[];
}

export default function ProductForm({
  categories,
  attributes,
}: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State'ler
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      // Manuel state değerlerini ekle
      formData.set("description", description);
      formData.set("name", name);
      
      // Slug otomatik oluştur (eğer boşsa)
      const finalSlug = slug.trim() || generateSlug(name);
      formData.set("slug", finalSlug);
      
      formData.set("price", price);
      formData.set("stock", stock);
      if (categoryId) {
        formData.set("categoryId", categoryId);
      }

      // Resimleri JSON string olarak ekle
      if (images.length > 0) {
        formData.set("images", JSON.stringify(images));
      }

      // Server Action Çağrısı
      const result = await createProduct(formData);

      // HATA ÇÖZÜMÜ: && result.data KISMI KALDIRILDI
      // createProduct fonksiyonu sadece { success: true } dönüyor.
      if (result.success) {
        router.refresh();
        router.push("/admin/products");
      } else {
        setError(result.error || "Ürün oluşturulurken bir hata oluştu");
      }
    } catch (err: any) {
      setError(err.message || "Beklenmedik bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 space-y-6"
    >
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sol Kolon */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ürün Adı *
            </label>
            <input
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Örn: Traktör Lastiği"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug (URL)
            </label>
            <input
              name="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
              placeholder="Otomatik oluşur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fiyat *
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stok *
            </label>
            <input
              name="stock"
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Sağ Kolon */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kategori *
            </label>
            <select
              name="categoryId"
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Kategori Seçin</option>
              {categories &&
                categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Görseller
            </label>
            <div className="mt-1">
              <ImageUpload
                images={images}
                onImagesChange={setImages}
                maxImages={5}
                folder="products"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Açıklama
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Link
          href="/admin/products"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          İptal
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-50"
        >
          {isSubmitting ? "Oluşturuluyor..." : "Ürünü Oluştur"}
        </button>
      </div>
    </form>
  );
}
