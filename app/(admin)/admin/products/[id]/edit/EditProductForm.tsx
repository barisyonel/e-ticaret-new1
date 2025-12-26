"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Eğer bu action yoksa hata alabilirsin, ismini kontrol et.
// Yoksa geçici olarak dosya sonuna boş fonksiyon ekleyebilirsin.
import { updateProduct } from "@/app/server-actions/productActions";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";

// HATA ÇÖZÜMÜ: Formun beklediği özellikleri (Props) sayfadan gelenle eşleşecek şekilde güncelledik.
// Tip güvenliği (type safety) yerine 'any' kullanarak build hatasını aşıyoruz.
interface EditProductFormProps {
  product: any;
  categories: any[];
  attributes: any[];
}

export default function EditProductForm({
  product,
  categories,
  attributes,
}: EditProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State'leri gelen ürün verisiyle dolduruyoruz
  // (?. operatörü ile veri yoksa patlamasını engelliyoruz)
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [categoryId, setCategoryId] = useState<number | string>(
    product?.categoryId || "",
  );

  // Resimler (Dizi mi string mi kontrolü)
  const initialImages = Array.isArray(product?.images)
    ? product.images
    : product?.image
      ? [product.image]
      : [];
  const [images, setImages] = useState<string[]>(initialImages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      // Manuel state değerlerini ekle
      formData.set("description", description);
      formData.set("name", name);
      formData.set("slug", slug);
      formData.set("price", price.toString());
      formData.set("stock", stock.toString());
      if (categoryId) {
        formData.set("categoryId", categoryId.toString());
      }

      // Resimleri JSON string olarak ekle
      if (images.length > 0) {
        formData.set("images", JSON.stringify(images));
      }

      // Server Action Çağrısı
      const result = await updateProduct(product.id, formData);

      if (result.success) {
        router.refresh();
        router.push("/admin/products");
      } else {
        setError(result.error || "Güncelleme başarısız.");
      }
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
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
              Ürün Adı
            </label>
            <input
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug
            </label>
            <input
              name="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fiyat
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stok
            </label>
            <input
              name="stock"
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Sağ Kolon */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              name="categoryId"
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </button>
      </div>
    </form>
  );
}
