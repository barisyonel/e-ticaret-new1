import { executeQuery, executeQueryOne, executeNonQuery } from '../db';

export type NotificationType = 'ORDER' | 'PAYMENT' | 'SHIPPING' | 'PROMOTION' | 'SYSTEM';
export type NotificationStatus = 'UNREAD' | 'READ' | 'ARCHIVED';

export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  relatedId: number | null; // Order ID, Product ID, etc.
  createdAt: Date;
  readAt: Date | null;
}

export interface CreateNotificationDto {
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  relatedId?: number | null;
}

export class NotificationRepository {
  // Parse SQL Server date string to Date object
  private static parseSqlDate(dateStr: string | null): Date | null {
    if (!dateStr) return null;
    try {
      return new Date(dateStr);
    } catch {
      return null;
    }
  }

  // Get notifications for user
  static async findByUserId(userId: number, limit: number = 20, offset: number = 0): Promise<Notification[]> {
    try {
      const notifications = await executeQuery<any>(
        `SELECT id, user_id as userId, type, title, message, status, related_id as relatedId,
                CONVERT(VARCHAR(23), created_at, 126) as createdAt,
                CASE WHEN read_at IS NULL THEN NULL ELSE CONVERT(VARCHAR(23), read_at, 126) END as readAt
         FROM notifications 
         WHERE user_id = @userId 
         ORDER BY created_at DESC
         OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`,
        { userId, limit, offset }
      );

      return notifications.map(notification => ({
        ...notification,
        createdAt: this.parseSqlDate(notification.createdAt)!,
        readAt: this.parseSqlDate(notification.readAt),
      }));
    } catch (error) {
      console.error('Error finding notifications by user ID:', error);
      return [];
    }
  }

  // Get unread count for user
  static async getUnreadCount(userId: number): Promise<number> {
    try {
      const result = await executeQueryOne<{ count: number }>(
        `SELECT COUNT(*) as count FROM notifications WHERE user_id = @userId AND status = 'UNREAD'`,
        { userId }
      );

      return result?.count || 0;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }

  // Create notification
  static async create(data: CreateNotificationDto): Promise<Notification> {
    try {
      const result = await executeQueryOne<{ id: number }>(
        `INSERT INTO notifications (user_id, type, title, message, status, related_id, created_at)
         OUTPUT INSERTED.id
         VALUES (@userId, @type, @title, @message, 'UNREAD', @relatedId, GETDATE())`,
        {
          userId: data.userId,
          type: data.type,
          title: data.title,
          message: data.message,
          relatedId: data.relatedId || null,
        }
      );

      if (!result) {
        throw new Error('Failed to create notification');
      }

      const notification = await this.findById(result.id);
      if (!notification) {
        throw new Error('Failed to retrieve created notification');
      }

      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  // Find notification by ID
  static async findById(id: number): Promise<Notification | null> {
    try {
      const notification = await executeQueryOne<any>(
        `SELECT id, user_id as userId, type, title, message, status, related_id as relatedId,
                CONVERT(VARCHAR(23), created_at, 126) as createdAt,
                CASE WHEN read_at IS NULL THEN NULL ELSE CONVERT(VARCHAR(23), read_at, 126) END as readAt
         FROM notifications 
         WHERE id = @id`,
        { id }
      );

      if (!notification) return null;

      return {
        ...notification,
        createdAt: this.parseSqlDate(notification.createdAt)!,
        readAt: this.parseSqlDate(notification.readAt),
      };
    } catch (error) {
      console.error('Error finding notification by ID:', error);
      return null;
    }
  }

  // Mark notification as read
  static async markAsRead(id: number, userId: number): Promise<boolean> {
    try {
      const rowsAffected = await executeNonQuery(
        `UPDATE notifications 
         SET status = 'READ', read_at = GETDATE() 
         WHERE id = @id AND user_id = @userId AND status = 'UNREAD'`,
        { id, userId }
      );

      return rowsAffected > 0;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  // Mark all notifications as read for user
  static async markAllAsRead(userId: number): Promise<boolean> {
    try {
      const rowsAffected = await executeNonQuery(
        `UPDATE notifications 
         SET status = 'read', read_at = GETDATE() 
         WHERE user_id = @userId AND status = 'UNREAD'`,
        { userId }
      );

      return rowsAffected >= 0; // Even 0 is success (no unread notifications)
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  // Delete notification
  static async delete(id: number, userId: number): Promise<boolean> {
    try {
      const rowsAffected = await executeNonQuery(
        'DELETE FROM notifications WHERE id = @id AND user_id = @userId',
        { id, userId }
      );

      return rowsAffected > 0;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  }

  // Create order notification
  static async createOrderNotification(userId: number, orderId: number, type: 'CREATED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'): Promise<void> {
    const notifications = {
      CREATED: {
        title: '🛒 Sipariş Oluşturuldu',
        message: `#${orderId} numaralı siparişiniz başarıyla oluşturuldu. Ödeme onayı bekleniyor.`,
      },
      CONFIRMED: {
        title: '✅ Sipariş Onaylandı',
        message: `#${orderId} numaralı siparişiniz onaylandı ve hazırlanmaya başlandı.`,
      },
      SHIPPED: {
        title: '🚚 Sipariş Kargoya Verildi',
        message: `#${orderId} numaralı siparişiniz kargoya verildi. Takip numaranızı kontrol edebilirsiniz.`,
      },
      DELIVERED: {
        title: '📦 Sipariş Teslim Edildi',
        message: `#${orderId} numaralı siparişiniz başarıyla teslim edildi. Teşekkür ederiz!`,
      },
      CANCELLED: {
        title: '❌ Sipariş İptal Edildi',
        message: `#${orderId} numaralı siparişiniz iptal edildi. İade işlemi başlatıldı.`,
      },
    };

    const notificationData = notifications[type];
    if (notificationData) {
      await this.create({
        userId,
        type: 'ORDER',
        title: notificationData.title,
        message: notificationData.message,
        relatedId: orderId,
      });
    }
  }

  // Create payment notification
  static async createPaymentNotification(userId: number, orderId: number, success: boolean): Promise<void> {
    const title = success ? '💳 Ödeme Başarılı' : '❌ Ödeme Başarısız';
    const message = success 
      ? `#${orderId} numaralı siparişinizin ödemesi başarıyla alındı.`
      : `#${orderId} numaralı siparişinizin ödemesi başarısız oldu. Lütfen tekrar deneyin.`;

    await this.create({
      userId,
      type: 'PAYMENT',
      title,
      message,
      relatedId: orderId,
    });
  }

  // Create promotion notification
  static async createPromotionNotification(userId: number, title: string, message: string): Promise<void> {
    await this.create({
      userId,
      type: 'PROMOTION',
      title: `🎉 ${title}`,
      message,
    });
  }

  // Create system notification for all users
  static async createSystemNotificationForAll(title: string, message: string): Promise<void> {
    try {
      // Get all user IDs
      const users = await executeQuery<{ id: number }>('SELECT id FROM users');
      
      // Create notification for each user
      for (const user of users) {
        await this.create({
          userId: user.id,
          type: 'SYSTEM',
          title: `📢 ${title}`,
          message,
        });
      }
    } catch (error) {
      console.error('Error creating system notification for all users:', error);
    }
  }
}