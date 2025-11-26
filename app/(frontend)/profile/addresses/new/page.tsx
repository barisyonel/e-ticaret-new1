import AddressForm from '../AddressForm';

export const dynamic = 'force-dynamic';

export default function NewAddressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-accent-yellow">
          <h1 className="text-3xl font-bold text-primary-blue mb-2">➕ Yeni Adres Ekle</h1>
          <p className="text-primary-blue-light">Teslimat için yeni adres bilgilerinizi girin</p>
        </div>

        {/* Form */}
        <AddressForm />
      </div>
    </div>
  );
}