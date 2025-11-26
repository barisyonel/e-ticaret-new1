'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/checkout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ödeme Başarısız
        </h1>

        <p className="text-gray-600 mb-4">
          Ödeme işlemi tamamlanamadı. Lütfen tekrar deneyin.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Sipariş Numarası</p>
            <p className="text-lg font-semibold text-gray-900">#{orderId}</p>
            <p className="text-xs text-gray-500 mt-2">
              Siparişiniz oluşturuldu ancak ödeme tamamlanamadı. Lütfen tekrar ödeme yapmayı deneyin.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-semibold"
          >
            Tekrar Dene
          </Link>

          <Link
            href="/cart"
            className="block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Sepete Dön
          </Link>
        </div>

        {countdown > 0 && (
          <p className="text-sm text-gray-500 mt-6">
            {countdown} saniye sonra ödeme sayfasına yönlendirileceksiniz...
          </p>
        )}
      </div>
    </div>
  );
}

