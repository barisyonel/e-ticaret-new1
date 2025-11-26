'use client';

import { useState } from 'react';
import Link from 'next/link';
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

interface AddressCardProps {
  address: Address;
  onSetDefault: (addressId: number) => Promise<any>;
  onDelete: (addressId: number) => Promise<any>;
}

export default function AddressCard({ address, onSetDefault, onDelete }: AddressCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSetDefault = async () => {
    if (address.isDefault) return;

    setIsLoading(true);
    try {
      const result = await onSetDefault(address.id);
      if (result.success) {
        showToast('Varsayılan adres güncellendi', 'success');
        window.location.reload(); // Refresh to show updated state
      } else {
        showToast(result.error || 'Bir hata oluştu', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await onDelete(address.id);
      if (result.success) {
        showToast('Adres silindi', 'success');
        window.location.reload(); // Refresh to show updated state
      } else {
        showToast(result.error || 'Bir hata oluştu', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
      address.isDefault ? 'border-accent-yellow bg-yellow-50' : 'border-primary-blue'
    } transition-all duration-300 hover:shadow-xl`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-primary-blue">{address.title}</h3>
          {address.isDefault && (
            <span className="bg-accent-yellow text-primary-blue text-xs px-2 py-1 rounded-full font-semibold">
              Varsayılan
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/profile/addresses/${address.id}/edit`}
            className="text-primary-blue hover:text-primary-blue-light transition-colors p-1"
            title="Düzenle"
          >
            ✏️
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 transition-colors p-1 disabled:opacity-50"
            title="Sil"
          >
            {isDeleting ? '⏳' : '🗑️'}
          </button>
        </div>
      </div>

      {/* Address Details */}
      <div className="space-y-2 mb-6">
        <p className="font-semibold text-gray-800">{address.fullName}</p>
        <p className="text-gray-600">{address.phone}</p>
        <p className="text-gray-700 leading-relaxed">{address.address}</p>
        <p className="text-gray-600">
          {address.district}, {address.city} {address.postalCode}
        </p>
        <p className="text-gray-600">{address.country}</p>
      </div>

      {/* Actions */}
      {!address.isDefault && (
        <button
          onClick={handleSetDefault}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary-blue to-primary-blue-light text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          {isLoading ? '⏳ Güncelleniyor...' : '⭐ Varsayılan Yap'}
        </button>
      )}
    </div>
  );
}
