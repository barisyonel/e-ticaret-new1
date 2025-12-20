import { notFound } from "next/navigation";
// Actions
import { getCategoryTree } from "@/app/server-actions/categoryActions";
// Eğer bu dosyaların yerleri farklıysa hata alabilirsin, standart yollar varsayıldı:
import { getProductById } from "@/app/server-actions/productActions";
import { getAllAttributesWithValues } from "@/app/server-actions/attributeActions";
// Form Component
import EditProductForm from "./EditProductForm";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    notFound();
  }

  // Verileri paralel olarak çekiyoruz
  const [productResult, categoriesResult, attributesResult] = await Promise.all(
    [
      getProductById(productId),
      getCategoryTree(true), // Admin panelinde tüm kategorileri göster
      getAllAttributesWithValues(false), // Parametreli (false = sadece aktifler değil hepsi)
    ],
  );

  // Kategori verisini güvenli hale getirme
  const categories =
    categoriesResult.success && categoriesResult.data
      ? categoriesResult.data
      : [];

  // --- HATA ÇÖZÜMÜ BURADA ---

  // 1. Gelen sonucu 'any' olarak işaretliyoruz ki TypeScript karışmasın
  let product = productResult as any;

  // 2. Eğer eski yapıdaki gibi { data: ... } içinde geliyorsa onu çıkartıyoruz
  if (product && typeof product === "object" && "data" in product) {
    product = product.data;
  }

  // 3. KESİN KONTROL: Eğer ürün yoksa, hata objesiyse veya isimsizse 404 ver
  // Bu kontrol "Property 'name' does not exist" hatasını engeller.
  if (!product || product.error || !product.name) {
    notFound();
  }

  // Attribute verisini güvenli hale getirme (AttributesResult kontrolü)
  const attributesData = attributesResult as any;
  const attributes =
    attributesData && attributesData.data
      ? attributesData.data
      : Array.isArray(attributesData)
        ? attributesData
        : [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ürün Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">
            "{product.name}" ürününün özelliklerini güncelleyin.
          </p>
        </div>
      </div>

      <EditProductForm
        product={product}
        categories={categories}
        attributes={attributes}
      />
    </div>
  );
}
