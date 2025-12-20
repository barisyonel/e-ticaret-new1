// app/(admin)/admin/products/new/page.tsx

import { getCategoryTree } from "@/app/server-actions/categoryActions";
import { getAllAttributesWithValues } from "@/app/server-actions/attributeActions";
// Eğer bileşen ismin farklıysa (örn: NewProductForm) burayı düzelt:
import ProductForm from "./ProductForm";

export default async function NewProductPage() {
  // Verileri paralel olarak çekiyoruz
  const [categoriesResult, attributesResult] = await Promise.all([
    getCategoryTree(true), // Admin panelinde tüm kategorileri göster
    getAllAttributesWithValues(false), // Bu fonksiyon eski yapıda olabilir, parametre kalabilir.
  ]);

  // Kategori verisini güvenli hale getirme
  const categories =
    categoriesResult.success && categoriesResult.data
      ? categoriesResult.data
      : [];

  // Attribute verisini güvenli hale getirme (result.data kontrolü)
  const attributesData = attributesResult as any;
  const attributes =
    attributesData && attributesData.data ? attributesData.data : [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
          <p className="mt-1 text-sm text-gray-500">
            Mağazanıza yeni bir ürün ekleyin.
          </p>
        </div>
      </div>

      <ProductForm categories={categories} attributes={attributes} />
    </div>
  );
}
