import { getUserNotifications, markAllNotificationsAsRead } from '@/app/server-actions/notificationActions';
import NotificationsList from './NotificationsList';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NotificationsPage() {
  const notificationsResult = await getUserNotifications(1, 50);
  const notifications = notificationsResult.success ? notificationsResult.data || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-accent-yellow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-blue mb-2">🔔 Bildirimlerim</h1>
              <p className="text-primary-blue-light">Sipariş durumu ve önemli güncellemeler</p>
            </div>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <form action={markAllNotificationsAsRead}>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                  >
                    ✅ Tümünü Okundu İşaretle
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-t-4 border-accent-yellow">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Henüz bildiriminiz yok</h2>
            <p className="text-gray-500 mb-8">
              Sipariş durumları ve önemli güncellemeler burada görünecek
            </p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-primary-blue to-primary-blue-light text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              🛒 Alışverişe Başla
            </Link>
          </div>
        ) : (
          <NotificationsList initialNotifications={notifications} />
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