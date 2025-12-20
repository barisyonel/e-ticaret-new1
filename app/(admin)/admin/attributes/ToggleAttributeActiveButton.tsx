"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Bu fonksiyonu attributeActions.ts içine eklemiştik, buradan çağırıyoruz
import { toggleAttributeActive } from "@/app/server-actions/attributeActions";

interface ToggleAttributeActiveButtonProps {
  attributeId: number; // HATA ÇÖZÜMÜ: Bu prop eksikti, ekledik.
  isActive: boolean;
}

export default function ToggleAttributeActiveButton({
  attributeId,
  isActive,
}: ToggleAttributeActiveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      // Server Action çağrısı
      const result = await toggleAttributeActive(attributeId, !isActive);

      if (result.success) {
        router.refresh();
      } else {
        alert("Durum değiştirilirken bir hata oluştu.");
      }
    } catch (error) {
      alert("Beklenmedik bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        px-3 py-1 rounded-full text-xs font-medium transition-colors
        ${
          isActive
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {isLoading ? "..." : isActive ? "Aktif" : "Pasif"}
    </button>
  );
}
