'use client';

import { useState } from 'react';
import { markNotificationAsRead, deleteNotification } from '@/app/server-actions/notificationActions';
import { showToast } from '@/components/ToastContainer';
import { formatDateToTurkey } from '@/lib/utils/dateFormatter';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  status: string;
  relatedId: number | null;
  createdAt: Date;
  readAt: Date | null;
}

interface NotificationsListProps {
  initialNotifications: Notification[];
}

export default function NotificationsList({ initialNotifications }: NotificationsListProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ORDER': return '🛒';
      case 'PAYMENT': return '💳';
      case 'SHIPPING': return '🚚';
      case 'PROMOTION': return '🎉';
      case 'SYSTEM': return '📢';
      default: return '📬';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ORDER': return 'border-blue-400 bg-blue-50';
      case 'PAYMENT': return 'border-green-400 bg-green-50';
      case 'SHIPPING': return 'border-yellow-400 bg-yellow-50';
      case 'PROMOTION': return 'border-purple-400 bg-purple-50';
      case 'SYSTEM': return 'border-red-400 bg-red-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    if (loadingIds.has(notificationId)) return;

    setLoadingIds(prev => new Set(prev).add(notificationId));
    
    try {
      const result = await markNotificationAsRead(notificationId);
      if (result.success) {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, status: 'read', readAt: new Date() }
              : notification
          )
        );
        showToast('Bildirim okundu olarak işaretlendi', 'success');
      } else {
        showToast(result.error || 'Bir hata oluştu', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    } finally {
      setLoadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  const handleDelete = async (notificationId: number) => {
    if (!confirm('Bu bildirimi silmek istediğinizden emin misiniz?')) {
      return;
    }

    if (loadingIds.has(notificationId)) return;

    setLoadingIds(prev => new Set(prev).add(notificationId));
    
    try {
      const result = await deleteNotification(notificationId);
      if (result.success) {
        setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
        showToast('Bildirim silindi', 'success');
      } else {
        showToast(result.error || 'Bir hata oluştu', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    } finally {
      setLoadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => {
        const isUnread = notification.status === 'UNREAD';
        const isLoading = loadingIds.has(notification.id);
        
        return (
          <div
            key={notification.id}
            className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 transition-all duration-300 hover:shadow-xl ${
              isUnread 
                ? `${getTypeColor(notification.type)} border-l-4` 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                {/* Icon */}
                <div className={`text-2xl p-2 rounded-full ${
                  isUnread ? 'bg-white shadow-md' : 'bg-gray-200'
                }`}>
                  {getTypeIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold ${isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notification.title}
                    </h3>
                    {isUnread && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Yeni
                      </span>
                    )}
                  </div>
                  
                  <p className={`mb-3 leading-relaxed ${isUnread ? 'text-gray-700' : 'text-gray-500'}`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📅 {formatDateToTurkey(notification.createdAt)}</span>
                    {notification.readAt && (
                      <span>👁️ Okundu: {formatDateToTurkey(notification.readAt)}</span>
                    )}
                    {notification.relatedId && (
                      <span>🔗 #{notification.relatedId}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 ml-4">
                {isUnread && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    disabled={isLoading}
                    className="text-green-600 hover:text-green-800 transition-colors p-2 rounded-lg hover:bg-green-100 disabled:opacity-50"
                    title="Okundu işaretle"
                  >
                    {isLoading ? '⏳' : '✅'}
                  </button>
                )}
                
                <button
                  onClick={() => handleDelete(notification.id)}
                  disabled={isLoading}
                  className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-100 disabled:opacity-50"
                  title="Sil"
                >
                  {isLoading ? '⏳' : '🗑️'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
