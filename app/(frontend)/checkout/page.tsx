'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { createOrder } from '@/app/server-actions/orderActions';
import { validateCoupon } from '@/app/server-actions/couponActions';
import { showToast } from '@/components/ToastContainer';

export default function CheckoutPage() {
  const { items, getTotal, clear } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number; couponId: number } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Türkiye',
    // Payment information
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvc: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate payment fields
      const cardNumberDigits = formData.cardNumber.replace(/\D/g, '');
      if (cardNumberDigits.length !== 16) {
        setError('Kart numarası 16 haneli olmalıdır');
        setIsSubmitting(false);
        return;
      }

      const expiryParts = formData.expiryDate.split('/');
      if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2) {
        setError('Son kullanma tarihi geçerli formatta değil (AA/YY)');
        setIsSubmitting(false);
        return;
      }

      if (formData.cvc.length !== 3) {
        setError('CVC 3 haneli olmalıdır');
        setIsSubmitting(false);
        return;
      }

      if (!formData.cardHolder || formData.cardHolder.trim().length < 2) {
        setError('Kart üzerindeki isim gereklidir');
        setIsSubmitting(false);
        return;
      }

      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      // Add coupon if applied
      if (appliedCoupon) {
        formDataObj.append('couponId', appliedCoupon.couponId.toString());
        formDataObj.append('discountAmount', appliedCoupon.discountAmount.toString());
      }

      const result = await createOrder(formDataObj);

      if (result.success && result.data) {
        // Clear cart
        await clear();
        // Redirect to order confirmation
        router.push(`/profile/orders/${result.data.orderId}`);
      } else {
        setError(result.error || 'Sipariş oluşturulurken bir hata oluştu');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sipariş oluşturulurken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Remove all non-digits
      const numbers = value.replace(/\D/g, '');
      // Limit to 16 digits
      const limited = numbers.slice(0, 16);
      // Format as XXXX XXXX XXXX XXXX
      const formatted = limited.replace(/(.{4})/g, '$1 ').trim();
      setFormData({
        ...formData,
        cardNumber: formatted,
      });
    } else if (name === 'expiryDate') {
      // Remove all non-digits
      const numbers = value.replace(/\D/g, '');
      // Limit to 4 digits
      const limited = numbers.slice(0, 4);
      // Format as MM/YY
      let formatted = limited;
      if (limited.length >= 2) {
        formatted = limited.slice(0, 2) + '/' + limited.slice(2, 4);
      }
      setFormData({
        ...formData,
        expiryDate: formatted,
      });
    } else if (name === 'cvc') {
      // Remove all non-digits and limit to 3
      const numbers = value.replace(/\D/g, '').slice(0, 3);
      setFormData({
        ...formData,
        cvc: numbers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const subtotal = getTotal();
  const discountAmount = appliedCoupon?.discountAmount || 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      showToast('Lütfen bir kupon kodu girin', 'error');
      return;
    }

    setIsValidatingCoupon(true);
    try {
      const result = await validateCoupon(couponCode.trim(), subtotal);
      if (result.success && result.data) {
        setAppliedCoupon({
          code: couponCode.trim().toUpperCase(),
          discountAmount: result.data.discountAmount,
          couponId: result.data.couponId,
        });
        showToast('Kupon başarıyla uygulandı!', 'success');
        setCouponCode('');
      } else {
        showToast(result.error || 'Kupon geçersiz', 'error');
      }
    } catch (error) {
      showToast('Kupon doğrulanırken bir hata oluştu', 'error');
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">Sepetiniz boş</p>
            <button
              onClick={() => router.push('/products')}
              className="inline-block px-8 py-4 bg-primary-blue text-white rounded-xl hover:bg-primary-blue-light transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              🛒 Alışverişe Başla
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-blue mb-4">💳 Güvenli Ödeme</h1>
          <p className="text-primary-blue-light text-lg">SSL sertifikalı güvenli ödeme altyapısı</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border-t-4 border-accent-yellow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Teslimat Bilgileri</h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Adres *
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                    Şehir *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">
                    Posta Kodu *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                  Ülke *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                />
              </div>

              {/* Payment Information */}
              <div className="border-t-2 border-accent-yellow pt-8 mt-8">
                <div className="bg-gradient-to-r from-primary-blue to-primary-blue-light rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      💳 Ödeme Bilgileri
                    </h2>
                    <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2">
                      <img src="/visa-logo.svg" alt="Visa" className="h-6 hover:scale-110 transition-transform" />
                      <img src="/mastercard-logo.svg" alt="MasterCard" className="h-6 hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="cardHolder" className="block text-gray-700 font-medium mb-2">
                    Kart Üzerindeki İsim *
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    required
                    value={formData.cardHolder}
                    onChange={handleChange}
                    placeholder="AD SOYAD"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 uppercase"
                    maxLength={50}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                    Kart Numarası *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono text-lg tracking-wider"
                    maxLength={19} // 16 digits + 3 spaces
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💳 16 haneli kart numaranızı giriniz
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
                      Son Kullanma Tarihi *
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="AA/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono"
                      maxLength={5}
                    />
                    <p className="text-xs text-gray-500 mt-1">AA/YY formatında</p>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-gray-700 font-medium mb-2">
                      CVC *
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      required
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono"
                      maxLength={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">3 haneli güvenlik kodu</p>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border-l-4 border-accent-yellow">
                  <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-2xl">🔒</span>
                      </div>
                      <div>
                        <p className="text-primary-blue font-semibold text-lg">
                          256-bit SSL Güvenlik
                        </p>
                        <p className="text-primary-blue-light text-sm">
                          Ödeme bilgileriniz güvenli altyapı ile işlenmektedir. Kart bilgileriniz saklanmaz.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <img src="/iyzico-ile-ode.svg" alt="iyzico ile Öde" className="h-12 mx-auto hover:scale-110 transition-transform" />
                        <p className="text-primary-blue text-xs mt-1 font-medium">Güvenli Ödeme</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-blue to-primary-blue-light hover:from-primary-blue-light hover:to-primary-blue text-white hover:shadow-xl'
                }`}
              >
{isSubmitting ? '⏳ Sipariş Oluşturuluyor...' : '🛒 Güvenli Ödeme ile Sipariş Ver'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-4 border-t-4 border-accent-yellow">
              <div className="bg-gradient-to-r from-primary-blue to-primary-blue-light rounded-xl p-4 mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  📋 Sipariş Özeti
                </h2>
                <p className="text-blue-100 text-sm">Sepetinizdeki ürünler</p>
              </div>
              
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-700">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>{(item.product.price * item.quantity).toFixed(2)} ₺</span>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="border-t pt-4 mb-4">
                {appliedCoupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-green-800">
                        Kupon: {appliedCoupon.code}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold"
                      >
                        Kaldır
                      </button>
                    </div>
                    <div className="text-lg font-bold text-green-700">
                      -{appliedCoupon.discountAmount.toFixed(2)} ₺
                    </div>
                  </div>
                ) : (
                  <div className="mb-3">
                    <label htmlFor="couponCode" className="block text-sm font-semibold text-gray-700 mb-2">
                      Kupon Kodu
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="couponCode"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="KUPON KODU"
                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow text-sm font-semibold uppercase"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyCoupon();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={isValidatingCoupon || !couponCode.trim()}
                        className="px-4 py-2 bg-accent-yellow text-primary-blue-dark rounded-lg hover:bg-accent-yellow-light transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isValidatingCoupon ? '...' : 'Uygula'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Ara Toplam</span>
                  <span>{subtotal.toFixed(2)} ₺</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600 font-semibold">
                    <span>İndirim</span>
                    <span>-{discountAmount.toFixed(2)} ₺</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Toplam</span>
                  <span>{total.toFixed(2)} ₺</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

