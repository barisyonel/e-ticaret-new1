'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createAddress, updateAddress } from '@/app/server-actions/addressActions';
import { showToast } from '@/components/ToastContainer';

interface Address {
  id: number;
  title: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface AddressFormProps {
  address?: Address;
}

export default function AddressForm({ address }: AddressFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: address?.title || '',
    fullName: address?.fullName || '',
    phone: address?.phone || '',
    address: address?.address || '',
    city: address?.city || '',
    district: address?.district || '',
    postalCode: address?.postalCode || '',
    country: address?.country || 'Türkiye',
    isDefault: address?.isDefault || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value.toString());
      });

      let result;
      if (address) {
        // Update existing address
        result = await updateAddress(address.id, formDataObj);
      } else {
        // Create new address
        result = await createAddress(formDataObj);
      }

      if (result.success) {
        showToast(
          address ? 'Adres başarıyla güncellendi' : 'Adres başarıyla eklendi',
          'success'
        );
        router.push('/profile/addresses');
      } else {
        showToast(result.error || 'Bir hata oluştu', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-accent-yellow">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Adres Başlığı *
          </label>
          <select
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
          >
            <option value="">Seçiniz</option>
            <option value="Ev">🏠 Ev</option>
            <option value="İş">🏢 İş</option>
            <option value="Diğer">📍 Diğer</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
            Ad Soyad *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
            placeholder="Adınız ve soyadınız"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Telefon Numarası *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
            placeholder="0555 123 45 67"
          />
        </div>

        {/* City and District */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
              Şehir *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
              placeholder="İstanbul"
            />
          </div>
          <div>
            <label htmlFor="district" className="block text-sm font-semibold text-gray-700 mb-2">
              İlçe *
            </label>
            <input
              type="text"
              id="district"
              name="district"
              required
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
              placeholder="Kadıköy"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
            Adres *
          </label>
          <textarea
            id="address"
            name="address"
            required
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all resize-none"
            placeholder="Mahalle, sokak, bina no, daire no..."
          />
        </div>

        {/* Postal Code and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700 mb-2">
              Posta Kodu *
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
              placeholder="34000"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
              Ülke *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
              placeholder="Türkiye"
            />
          </div>
        </div>

        {/* Default Address */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isDefault"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="w-4 h-4 text-primary-blue bg-gray-100 border-gray-300 rounded focus:ring-primary-blue focus:ring-2"
          />
          <label htmlFor="isDefault" className="ml-2 text-sm font-medium text-gray-700">
            Bu adresi varsayılan adres olarak ayarla
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-primary-blue to-primary-blue-light text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isSubmitting ? '⏳ Kaydediliyor...' : address ? '💾 Güncelle' : '➕ Kaydet'}
          </button>
          <Link
            href="/profile/addresses"
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold text-center hover:bg-gray-200 transition-all duration-300"
          >
            ❌ İptal
          </Link>
        </div>
      </form>
    </div>
  );
}