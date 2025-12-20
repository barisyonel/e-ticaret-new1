"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAttribute } from "@/app/server-actions/attributeActions";

export default function AttributeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await createAttribute(formData);

      // HATA ÇÖZÜMÜ: "&& result.data" KISMI KALDIRILDI
      // Sadece işlemin başarılı olup olmadığına bakıyoruz.
      if (result.success) {
        router.refresh();
        router.push("/admin/attributes");
      } else {
        // result.error string veya null olabilir, güvenli hale getirdik
        setError(result.error || "Özellik oluşturulurken bir hata oluştu");
      }
    } catch (err) {
      setError("Beklenmedik bir hata oluştu");
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Özellik Adı (Örn: Renk, Beden)
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Özellik adı giriniz..."
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          Slug (Opsiyonel)
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Otomatik oluşturulur"
        />
        <p className="mt-1 text-xs text-gray-500">
          URL'de görünecek isim. Boş bırakırsanız otomatik oluşturulur.
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
        >
          {isSubmitting ? "Oluşturuluyor..." : "Oluştur"}
        </button>
      </div>
    </form>
  );
}
