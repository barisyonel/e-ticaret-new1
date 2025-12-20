'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteAttribute } from '@/app/server-actions/attributeActions';

// HATA ÇÖZÜMÜ: attributeId prop'unu buraya ekledik
interface DeleteAttributeButtonProps {
  attributeId: number;
}

export default function DeleteAttributeButton({ attributeId }: DeleteAttributeButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Bu özelliği silmek istediğinize emin misiniz?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await deleteAttribute(attributeId);
      
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Silme işlemi başarısız.');
      }
    } catch (error) {
      alert('Beklenmedik bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-900 font-medium transition-colors disabled:opacity-50"
    >
      {loading ? 'Siliniyor...' : 'Sil'}
    </button>
  );
}