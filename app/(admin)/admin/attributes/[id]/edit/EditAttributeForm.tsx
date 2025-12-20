"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateAttribute,
  createAttributeValue,
  deleteAttributeValue,
} from "@/app/server-actions/attributeActions";

// Repository bağımlılığı yerine yerel tip tanımı (Build garantisi için)
interface AttributeValue {
  id: number;
  name: string;
  slug: string;
  hex?: string;
}

interface Attribute {
  id: number;
  name: string;
  slug: string;
  values: AttributeValue[];
}

interface EditAttributeFormProps {
  attribute: Attribute;
}

export default function EditAttributeForm({
  attribute: initialAttribute,
}: EditAttributeFormProps) {
  const router = useRouter();
  const [attribute, setAttribute] = useState<Attribute>(initialAttribute);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Yeni Değer Ekleme State'i
  const [newValueName, setNewValueName] = useState("");

  // 1. ANA ÖZELLİĞİ GÜNCELLEME
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateAttribute(attribute.id, formData);

      // HATA ÇÖZÜMÜ: result.data kontrolü kaldırıldı.
      if (result.success) {
        router.refresh();
        alert("Özellik başarıyla güncellendi");
      } else {
        setError("Güncelleme başarısız oldu.");
      }
    } catch (err) {
      setError("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // 2. YENİ DEĞER EKLEME (Örn: Renk için 'Kırmızı' ekleme)
  const handleAddValue = async () => {
    if (!newValueName.trim()) return;

    // FormData simülasyonu
    const formData = new FormData();
    formData.append("name", newValueName);

    try {
      const result = await createAttributeValue(attribute.id, formData);
      if (result.success) {
        setNewValueName("");
        router.refresh();
      }
    } catch (error) {
      alert("Değer eklenemedi");
    }
  };

  // 3. DEĞER SİLME
  const handleDeleteValue = async (valueId: number) => {
    if (!confirm("Bu değeri silmek istediğinize emin misiniz?")) return;

    try {
      const result = await deleteAttributeValue(valueId);
      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      alert("Silme işlemi başarısız");
    }
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg shadow">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {/* Üst Kısım: Özellik Bilgileri Düzenleme */}
      <form onSubmit={handleSubmit} className="space-y-4 border-b pb-8">
        <h2 className="text-xl font-bold text-gray-800">Özellik Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Özellik Adı
            </label>
            <input
              name="name"
              defaultValue={attribute.name}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug
            </label>
            <input
              name="slug"
              defaultValue={attribute.slug}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : "Güncelle"}
        </button>
      </form>

      {/* Alt Kısım: Değerler Listesi */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Seçenekler / Değerler
          </h2>
        </div>

        {/* Yeni Değer Ekleme */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newValueName}
            onChange={(e) => setNewValueName(e.target.value)}
            placeholder="Yeni değer adı (Örn: XL)"
            className="flex-1 border border-gray-300 rounded-md p-2"
          />
          <button
            type="button"
            onClick={handleAddValue}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ekle
          </button>
        </div>

        {/* Liste */}
        <ul className="divide-y divide-gray-200 border rounded-md">
          {attribute.values &&
            attribute.values.map((val) => (
              <li
                key={val.id}
                className="flex justify-between items-center p-3 hover:bg-gray-50"
              >
                <span>{val.name}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteValue(val.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Sil
                </button>
              </li>
            ))}
          {(!attribute.values || attribute.values.length === 0) && (
            <li className="p-4 text-center text-gray-500">
              Henüz değer eklenmemiş.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
