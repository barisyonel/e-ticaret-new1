import Link from "next/link";
// HATA ÇÖZÜMÜ: getAllAttributes yerine getAllAttributesWithValues kullanıyoruz
import { getAllAttributesWithValues } from "@/app/server-actions/attributeActions";
import DeleteAttributeButton from "./DeleteAttributeButton";
import ToggleAttributeActiveButton from "./ToggleAttributeActiveButton";

export default async function AttributesPage() {
  // Veriyi çek
  const result = await getAllAttributesWithValues();

  // Veriyi güvenli şekilde diziye çevir (Tip hatası olmaması için 'any' kullanıyoruz)
  const attributes = (result as any).data || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ürün Özellikleri</h1>
        <Link
          href="/admin/attributes/new"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
        >
          + Yeni Özellik
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Değerler
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attributes.length > 0 ? (
              attributes.map((attr: any) => (
                <tr key={attr.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {attr.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attr.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {attr.values?.map((val: any) => (
                        <span
                          key={val.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {val.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <ToggleAttributeActiveButton
                      attributeId={attr.id}
                      isActive={true}
                    />
                    <Link
                      href={`/admin/attributes/${attr.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Düzenle
                    </Link>
                    <DeleteAttributeButton attributeId={attr.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Kayıtlı özellik bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
