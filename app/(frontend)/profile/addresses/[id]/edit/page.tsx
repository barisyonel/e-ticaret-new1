import { getAddressById } from '@/app/server-actions/addressActions';
import AddressForm from '../../AddressForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface EditAddressPageProps {
  params: {
    id: string;
  };
}

export default async function EditAddressPage({ params }: EditAddressPageProps) {
  const addressId = parseInt(params.id, 10);
  
  if (isNaN(addressId)) {
    notFound();
  }

  const addressResult = await getAddressById(addressId);
  
  if (!addressResult.success || !addressResult.data) {
    notFound();
  }

  const address = addressResult.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-accent-yellow">
          <h1 className="text-3xl font-bold text-primary-blue mb-2">✏️ Adres Düzenle</h1>
          <p className="text-primary-blue-light">"{address.title}" adresini düzenleyin</p>
        </div>

        {/* Form */}
        <AddressForm address={address} />
      </div>
    </div>
  );
}