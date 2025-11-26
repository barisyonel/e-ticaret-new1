import { OrderRepository, OrderStatus } from '@/lib/repositories/OrderRepository';
import { executeNonQuery } from '@/lib/db';
import { CartRepository } from '@/lib/repositories/CartRepository';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { createNotification } from '@/app/server-actions/notificationActions';
import { UserRepository } from '@/lib/repositories/UserRepository';
import Iyzipay from 'iyzipay';

export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const token = formData.get('token') as string;

    if (!token) {
      return Response.json({ error: 'Token gerekli' }, { status: 400 });
    }

    // Initialize iyzico
    const apiKey = process.env.IYZICO_API_KEY;
    const secretKey = process.env.IYZICO_SECRET_KEY;
    const baseUrl = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

    if (!apiKey || !secretKey) {
      throw new Error('IYZICO_API_KEY ve IYZICO_SECRET_KEY gerekli');
    }

    const iyzipay = new Iyzipay({
      apiKey,
      secretKey,
      uri: baseUrl,
    });

    // Retrieve checkout form result
    return new Promise<Response>((resolve, reject) => {
      (iyzipay.checkoutForm as any).retrieve(
        { token },
        async (err: any, result: any) => {
          if (err) {
            console.error('iyzico callback error:', err);
            reject(Response.json({ error: 'Ödeme sonucu alınamadı' }, { status: 500 }));
            return;
          }

          try {
            // Extract order ID from conversationId (format: ORDER-{orderId})
            const conversationId = result.conversationId || '';
            const orderIdMatch = conversationId.match(/ORDER-(\d+)/);
            if (!orderIdMatch) {
              throw new Error('Sipariş ID bulunamadı');
            }
            const orderId = parseInt(orderIdMatch[1], 10);

            // Get order
            const order = await OrderRepository.findById(orderId);
            if (!order) {
              throw new Error('Sipariş bulunamadı');
            }

            if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
              // Payment successful
              await executeNonQuery(
                `UPDATE orders 
                 SET payment_status = @paymentStatus, 
                     iyzico_payment_id = @iyzicoPaymentId,
                     status = @status,
                     updated_at = GETDATE()
                 WHERE id = @orderId`,
                {
                  orderId,
                  paymentStatus: 'SUCCESS',
                  iyzicoPaymentId: result.paymentId || null,
                  status: OrderStatus.CONFIRMED,
                }
              );

              // Update order status to CONFIRMED
              await OrderRepository.updateStatus(orderId, OrderStatus.CONFIRMED);

              // Clear cart
              await CartRepository.clearByUserId(order.userId);

              // Send confirmation email
              try {
                const user = await UserRepository.findById(order.userId);
                if (user) {
                  const orderItemsForEmail = order.items.map((item) => ({
                    name: item.nameSnapshot,
                    quantity: item.quantity,
                    price: item.priceSnapshot,
                  }));

                  await sendOrderConfirmationEmail(
                    user.email,
                    user.name,
                    order.id,
                    order.total,
                    orderItemsForEmail
                  );
                }
              } catch (emailError) {
                console.error('Failed to send order confirmation email:', emailError);
              }

              // Create notification
              try {
                await createNotification({
                  userId: order.userId,
                  type: 'ORDER',
                  title: 'Siparişiniz Onaylandı',
                  message: `Siparişiniz (#${order.id}) başarıyla ödendi ve onaylandı. Toplam tutar: ${order.total.toFixed(2)} ₺`,
                  dataJson: { orderId: order.id },
                });
              } catch (notificationError) {
                console.error('Failed to create notification:', notificationError);
              }

              // Redirect to success page
              const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
              resolve(
                Response.redirect(`${baseUrl}/payment/success?orderId=${orderId}`, 302)
              );
            } else {
              // Payment failed
              const errorMessage = result.errorMessage || 'Ödeme işlemi başarısız';

              await executeNonQuery(
                `UPDATE orders 
                 SET payment_status = @paymentStatus, 
                     payment_error_message = @paymentErrorMessage,
                     updated_at = GETDATE()
                 WHERE id = @orderId`,
                {
                  orderId,
                  paymentStatus: 'FAILED',
                  paymentErrorMessage: errorMessage,
                }
              );

              // Redirect to failure page
              const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
              resolve(
                Response.redirect(`${baseUrl}/payment/failure?orderId=${orderId}&error=${encodeURIComponent(errorMessage)}`, 302)
              );
            }
          } catch (error: any) {
            console.error('Callback processing error:', error);
            reject(Response.json({ error: error.message }, { status: 500 }));
          }
        }
      );
    });
  } catch (error: any) {
    console.error('Callback error:', error);
    return Response.json({ error: error.message || 'Callback işlenemedi' }, { status: 500 });
  }
}

