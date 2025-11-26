'use server';

import { requireUser } from '@/lib/requireUser';
import { CartRepository } from '@/lib/repositories/CartRepository';
import { CouponRepository } from '@/lib/repositories/CouponRepository';
import { UserRepository } from '@/lib/repositories/UserRepository';
import { executeTransaction, sql } from '@/lib/db';
import Iyzipay from 'iyzipay';

export const dynamic = 'force-dynamic';

interface InitializePaymentRequest {
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  couponId?: number;
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body: InitializePaymentRequest = await request.json();

    // Get cart items
    const cartItems = await CartRepository.findByUserId(user.id);
    if (cartItems.length === 0) {
      return Response.json(
        { error: 'Sepetiniz boş' },
        { status: 400 }
      );
    }

    // Calculate total
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Apply coupon if provided
    let discountAmount = 0;
    let finalTotal = subtotal;
    if (body.couponId) {
      const coupon = await CouponRepository.findById(body.couponId);
      if (coupon) {
        const validation = await CouponRepository.validateCoupon(
          coupon.code,
          user.id,
          subtotal
        );
        if (validation.valid && validation.discountAmount) {
          discountAmount = validation.discountAmount;
          finalTotal = Math.max(0, subtotal - discountAmount);
        }
      }
    }

    // Create order first (PENDING status)
    const order = await executeTransaction(async (transaction) => {
      // Check stock and prepare order items
      const orderItems = [];
      for (const cartItem of cartItems) {
        const product = await CartRepository.getProductById(cartItem.productId);
        if (!product || !product.active) {
          throw new Error(`${product?.name || 'Ürün'} bulunamadı veya aktif değil`);
        }
        if (product.stock < cartItem.quantity) {
          throw new Error(`${product.name} için yeterli stok yok (Mevcut: ${product.stock})`);
        }

        orderItems.push({
          productId: product.id,
          nameSnapshot: product.name,
          priceSnapshot: product.price,
          quantity: cartItem.quantity,
        });
      }

      // Create order
      const orderRequest = new sql.Request(transaction);
      orderRequest.input('userId', sql.Int, user.id);
      orderRequest.input('total', sql.Decimal(18, 2), finalTotal);
      orderRequest.input('status', sql.VarChar(50), 'PENDING');
      orderRequest.input('shippingAddressJson', sql.NVarChar(sql.MAX), JSON.stringify(body.shippingAddress));
      orderRequest.input('paymentStatus', sql.VarChar(50), 'PENDING');

      const orderResult = await orderRequest.query(`
        INSERT INTO orders (user_id, total, status, shipping_address_json, payment_status, created_at, updated_at)
        OUTPUT INSERTED.id
        VALUES (@userId, @total, @status, @shippingAddressJson, @paymentStatus, GETDATE(), GETDATE())
      `);

      const orderId = orderResult.recordset[0].id;

      // Insert order items
      for (const item of orderItems) {
        const itemRequest = new sql.Request(transaction);
        itemRequest.input('orderId', sql.Int, orderId);
        itemRequest.input('productId', sql.Int, item.productId);
        itemRequest.input('nameSnapshot', sql.NVarChar(255), item.nameSnapshot);
        itemRequest.input('priceSnapshot', sql.Decimal(18, 2), item.priceSnapshot);
        itemRequest.input('quantity', sql.Int, item.quantity);

        await itemRequest.query(`
          INSERT INTO order_items (order_id, product_id, name_snapshot, price_snapshot, quantity)
          VALUES (@orderId, @productId, @nameSnapshot, @priceSnapshot, @quantity)
        `);
      }

      // Apply coupon if used
      if (body.couponId && discountAmount > 0) {
        const couponUpdateRequest = new sql.Request(transaction);
        couponUpdateRequest.input('couponId', sql.Int, body.couponId);
        await couponUpdateRequest.query(`
          UPDATE coupons 
          SET used_count = used_count + 1, updated_at = GETDATE()
          WHERE id = @couponId
        `);

        const couponUsageRequest = new sql.Request(transaction);
        couponUsageRequest.input('couponId', sql.Int, body.couponId);
        couponUsageRequest.input('userId', sql.Int, user.id);
        couponUsageRequest.input('orderId', sql.Int, orderId);
        await couponUsageRequest.query(`
          INSERT INTO coupon_usage (coupon_id, user_id, order_id, used_at)
          VALUES (@couponId, @userId, @orderId, GETDATE())
        `);
      }

      return { orderId, orderItems };
    });

    // Get user data
    const userData = await UserRepository.findById(user.id);
    const userEmail = userData?.email || `${user.id}@temp.com`;

    // Prepare buyer name
    const nameParts = body.shippingAddress.fullName.trim().split(' ');
    const buyerName = nameParts[0] || body.shippingAddress.fullName;
    const buyerSurname = nameParts.slice(1).join(' ') || buyerName;

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

    // Prepare callback URL
    const baseUrlFromRequest = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const callbackUrl = `${baseUrlFromRequest}/api/iyzico/callback`;

    // Create checkout form initialization
    const checkoutFormInitializeRequest = {
      locale: 'tr',
      conversationId: `ORDER-${order.orderId}`,
      price: finalTotal.toFixed(2),
      paidPrice: finalTotal.toFixed(2),
      currency: 'TRY',
      basketId: `BASKET-${order.orderId}`,
      callbackUrl: callbackUrl,
      enabledInstallments: [2, 3, 6, 9],
      buyer: {
        id: user.id.toString(),
        name: buyerName,
        surname: buyerSurname,
        gsmNumber: body.shippingAddress.phone.replace(/\D/g, ''),
        email: userEmail,
        registrationAddress: body.shippingAddress.address,
        city: body.shippingAddress.city,
        country: body.shippingAddress.country,
        zipCode: body.shippingAddress.postalCode,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1',
      },
      shippingAddress: {
        contactName: body.shippingAddress.fullName,
        city: body.shippingAddress.city,
        country: body.shippingAddress.country,
        address: body.shippingAddress.address,
        zipCode: body.shippingAddress.postalCode,
      },
      billingAddress: {
        contactName: body.shippingAddress.fullName,
        city: body.shippingAddress.city,
        country: body.shippingAddress.country,
        address: body.shippingAddress.address,
        zipCode: body.shippingAddress.postalCode,
      },
      basketItems: order.orderItems.map((item, index) => ({
        id: `ITEM-${order.orderId}-${index}`,
        name: item.nameSnapshot,
        category1: 'Product',
        itemType: 'PHYSICAL',
        price: (item.priceSnapshot * item.quantity).toFixed(2),
      })),
    };

    return new Promise((resolve, reject) => {
      iyzipay.checkoutFormInitialize.create(
        checkoutFormInitializeRequest,
        (err: any, result: any) => {
          if (err) {
            console.error('iyzico checkout form initialize error:', err);
            reject(Response.json({ error: 'Ödeme formu oluşturulamadı' }, { status: 500 }));
            return;
          }

          if (result.status === 'success') {
            resolve(
              Response.json({
                checkoutFormContent: result.checkoutFormContent,
                paymentPageUrl: result.paymentPageUrl,
                orderId: order.orderId,
              })
            );
          } else {
            console.error('iyzico checkout form initialize failed:', result);
            reject(
              Response.json(
                { error: result.errorMessage || 'Ödeme formu oluşturulamadı' },
                { status: 400 }
              )
            );
          }
        }
      );
    });
  } catch (error: any) {
    console.error('Initialize payment error:', error);
    return Response.json(
      { error: error.message || 'Ödeme başlatılamadı' },
      { status: 500 }
    );
  }
}

