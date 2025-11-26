import Link from 'next/link';
import { getUserAddresses, setDefaultAddress, deleteAddress } from '@/app/server-actions/addressActions';
import AddressCard from './AddressCard';

export const dynamic = 'force-dynamic';

export default async function AddressesPage() {
  const addressesResult = await getUserAddresses();
  const addresses = addressesResult.success ? addressesResult.data || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-accent-yellow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-blue mb-2">📍 Adres Defterim</h1>
              <p className="text-primary-blue-light">Teslimat adreslerinizi yönetin</p>
            </div>
            <Link
              href="/profile/addresses/new"
              className="bg-gradient-to-r from-primary-blue to-primary-blue-light text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              ➕ Yeni Adres Ekle
            </Link>
          </div>
        </div>

        {/* Addresses List */}
        {addresses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-t-4 border-accent-yellow">
            <div className="text-6xl mb-4">📍</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Henüz adres eklememişsiniz</h2>
            <p className="text-gray-500 mb-8">
              Hızlı teslimat için adres bilgilerinizi ekleyin
            </p>
            <Link
              href="/profile/addresses/new"
              className="inline-block bg-gradient-to-r from-primary-blue to-primary-blue-light text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              İlk Adresimi Ekle
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address: any) => (
              <AddressCard
                key={address.id}
                address={address}
                onSetDefault={setDefaultAddress}
                onDelete={deleteAddress}
              />
            ))}
          </div>
        )}

        {/* Back to Profile */}
        <div className="mt-8 text-center">
          <Link
            href="/profile"
            className="inline-flex items-center text-primary-blue hover:text-primary-blue-light transition-colors font-semibold"
          >
            ← Profilime Dön
          </Link>
        </div>
      </div>
    </div>
  );
}