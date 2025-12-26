/**
 * Ürün görseli için URL oluşturma yardımcı fonksiyonları
 * Eğer ürün görseli yoksa, ürün adından veya slug'dan otomatik görsel URL'i oluşturur
 */

/**
 * Ürün adından veya slug'dan bir hash değeri oluşturur
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Ürün için görsel URL'i oluşturur
 * Eğer görsel yoksa, ürün adından veya slug'dan otomatik bir görsel URL'i oluşturur
 * 
 * @param images - Ürün görselleri dizisi
 * @param productName - Ürün adı
 * @param slug - Ürün slug'ı (opsiyonel)
 * @param width - Görsel genişliği (varsayılan: 400)
 * @param height - Görsel yüksekliği (varsayılan: 300)
 * @returns Görsel URL'i
 */
export function getProductImageUrl(
  images: string[] | null | undefined,
  productName: string,
  slug?: string,
  width: number = 400,
  height: number = 300
): string {
  // Eğer görsel varsa, ilk görseli döndür
  if (images && images.length > 0 && images[0]) {
    return images[0];
  }

  // Görsel yoksa, ürün adından veya slug'dan otomatik görsel URL'i oluştur
  const seed = slug ? hashString(slug) : hashString(productName);
  
  // Placeholder.com kullanarak seed'e göre görsel oluştur
  // Bu, aynı ürün için her zaman aynı görseli döndürür
  // Format: https://via.placeholder.com/{width}x{height}/{color}/ffffff?text={text}
  const text = encodeURIComponent(productName.substring(0, 20));
  const color = `000000${seed.toString(16).padStart(6, '0')}`.slice(-6);
  return `https://via.placeholder.com/${width}x${height}/${color}/ffffff?text=${text}`;
}

/**
 * Ürün için birden fazla görsel URL'i oluşturur
 * Eğer görseller yoksa, ürün adından veya slug'dan otomatik görsel URL'leri oluşturur
 * 
 * @param images - Ürün görselleri dizisi
 * @param productName - Ürün adı
 * @param slug - Ürün slug'ı (opsiyonel)
 * @param count - Oluşturulacak görsel sayısı (varsayılan: 1)
 * @param width - Görsel genişliği (varsayılan: 400)
 * @param height - Görsel yüksekliği (varsayılan: 300)
 * @returns Görsel URL'leri dizisi
 */
export function getProductImages(
  images: string[] | null | undefined,
  productName: string,
  slug?: string,
  count: number = 1,
  width: number = 400,
  height: number = 300
): string[] {
  // Eğer görseller varsa, onları döndür
  if (images && images.length > 0) {
    return images.filter(img => img); // Boş görselleri filtrele
  }

  // Görsel yoksa, ürün adından veya slug'dan otomatik görsel URL'leri oluştur
  const seed = slug ? hashString(slug) : hashString(productName);
  const imageUrls: string[] = [];
  
  for (let i = 0; i < count; i++) {
    // Her görsel için farklı bir seed oluştur (i ekleyerek)
    const imageSeed = seed + i;
    const text = encodeURIComponent(`${productName.substring(0, 15)} ${i + 1}`);
    const color = `000000${imageSeed.toString(16).padStart(6, '0')}`.slice(-6);
    imageUrls.push(`https://via.placeholder.com/${width}x${height}/${color}/ffffff?text=${text}`);
  }
  
  return imageUrls;
}

