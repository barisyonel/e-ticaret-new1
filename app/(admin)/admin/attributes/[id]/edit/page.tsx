import { notFound } from 'next/navigation';
import { getAttributeById } from '@/app/server-actions/attributeActions';
import EditAttributeForm from './EditAttributeForm';

interface EditAttributePageProps {
  params: {
    id: string;
  };
}

export default async function EditAttributePage({ params }: EditAttributePageProps) {
  const attributeId = parseInt(params.id);

  if (isNaN(attributeId)) {
    notFound();
  }

  // HATA ÇÖZÜMÜ:
  // getAttributeById artık direkt obje veya null dönüyor.
  // Eski kod: const attributeResult = ... ve if(!result.success) şeklindeydi.
  // Yeni kod: Direkt değişkeni alıyoruz.
  const attribute = await getAttributeById(attributeId);

  // Eğer attribute null ise (bulunamadıysa) 404
  if (!attribute) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Özellik Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">
            "{attribute.name}" özelliğini ve değerlerini yönetin.
          </p>
        </div>
      </div>

      <EditAttributeForm attribute={attribute} />
    </div>
  );
}