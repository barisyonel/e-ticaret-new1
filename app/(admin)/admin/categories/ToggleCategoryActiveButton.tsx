'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toggleCategoryActive } from '@/app/server-actions/categoryActions';

interface ToggleCategoryActiveButtonProps {
  categoryId: number;
  isActive: boolean;
  categoryName: string;
}

// DÜZELTME: "export default function" YERİNE "export function" YAZIYORUZ
export function ToggleCategoryActiveButton({
  categoryId,
  isActive,
  categoryName,
}: ToggleCategoryActiveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      // Server action'ı çağırıyoruz
      const result = await toggleCategoryActive(categoryId, !isActive);

      if (!result.success) {
        alert(result.error || 'Durum değiştirilirken bir hata oluştu.');
      } else {
        // Başarılıysa sayfayı yenile (veriyi güncellemek için)
        router.refresh();
      }
    } catch (error) {
      alert('Beklenmedik bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        px-3 py-1 rounded-full text-xs font-semibold transition-colors
        ${isActive 
          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {isLoading 
        ? '...' 
        : (isActive ? 'Aktif' : 'Pasif')}
    </button>
  );
}