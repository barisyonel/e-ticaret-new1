"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/app/server-actions/categoryActions";

interface DeleteCategoryButtonProps {
  categoryId: number;
  categoryName: string;
}

// ÖNEMLİ DEĞİŞİKLİK:
// Burada "export default function" yerine sadece "export function" kullanıyoruz.
// Bu sayede CategoryRow.tsx içindeki { DeleteCategoryButton } importu hatasız çalışır.

export function DeleteCategoryButton({
  categoryId,
  categoryName,
}: DeleteCategoryButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        `"${categoryName}" kategorisini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const result = await deleteCategory(categoryId);

      if (result.success) {
        // Silme başarılıysa sayfayı yenile
        router.refresh();
      } else {
        alert(result.error || "Kategori silinirken bir hata oluştu.");
      }
    } catch (error) {
      alert("Beklenmedik bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
      title="Kategoriyi Sil"
    >
      {loading ? "Siliniyor..." : "Sil"}
    </button>
  );
}
