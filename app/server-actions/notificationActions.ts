'use server';

import { requireUser } from '@/lib/requireUser';
import { NotificationRepository, NotificationType } from '@/lib/repositories/NotificationRepository';

export interface ActionResponse<T = void> {
  success: boolean;
  error?: string;
  data?: T;
}

/**
 * Get user notifications
 */
export async function getUserNotifications(page: number = 1, limit: number = 20): Promise<ActionResponse<any[]>> {
  try {
    const user = await requireUser();
    const offset = (page - 1) * limit;
    const notifications = await NotificationRepository.findByUserId(user.id, limit, offset);

    return {
      success: true,
      data: notifications,
    };
  } catch (error: any) {
    console.error('Get user notifications error:', error);
    return {
      success: false,
      error: error.message || 'Bildirimler yüklenirken bir hata oluştu',
    };
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(): Promise<ActionResponse<{ count: number }>> {
  try {
    const user = await requireUser();
    const count = await NotificationRepository.getUnreadCount(user.id);

    return {
      success: true,
      data: { count },
    };
  } catch (error: any) {
    console.error('Get unread notification count error:', error);
    return {
      success: false,
      error: error.message || 'Bildirim sayısı alınırken bir hata oluştu',
    };
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: number): Promise<ActionResponse> {
  try {
    const user = await requireUser();
    const success = await NotificationRepository.markAsRead(notificationId, user.id);

    if (!success) {
      return {
        success: false,
        error: 'Bildirim bulunamadı veya zaten okunmuş',
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Mark notification as read error:', error);
    return {
      success: false,
      error: error.message || 'Bildirim okundu olarak işaretlenirken bir hata oluştu',
    };
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(): Promise<ActionResponse> {
  try {
    const user = await requireUser();
    const success = await NotificationRepository.markAllAsRead(user.id);

    if (!success) {
      return {
        success: false,
        error: 'Bildirimler işaretlenirken bir hata oluştu',
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Mark all notifications as read error:', error);
    return {
      success: false,
      error: error.message || 'Bildirimler okundu olarak işaretlenirken bir hata oluştu',
    };
  }
}

/**
 * Delete notification
 */
export async function deleteNotification(notificationId: number): Promise<ActionResponse> {
  try {
    const user = await requireUser();
    const success = await NotificationRepository.delete(notificationId, user.id);

    if (!success) {
      return {
        success: false,
        error: 'Bildirim bulunamadı',
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Delete notification error:', error);
    return {
      success: false,
      error: error.message || 'Bildirim silinirken bir hata oluştu',
    };
  }
}