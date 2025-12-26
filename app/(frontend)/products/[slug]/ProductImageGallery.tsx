'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getProductImageUrl, getProductImages } from '@/lib/utils/productImage';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  slug?: string;
}

export default function ProductImageGallery({ images, productName, slug }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  // Eğer görsel yoksa, URL'den otomatik görsel oluştur
  const productImages = images && images.length > 0 
    ? images 
    : getProductImages(null, productName, slug, 3, 600, 600);
  const mainImage = productImages[selectedImage] || productImages[0] || getProductImageUrl(null, productName, slug, 600, 600);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail Images */}
      {productImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                selectedImage === index
                  ? 'border-accent-yellow shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Görsel ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

