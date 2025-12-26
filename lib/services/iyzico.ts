'use server';

import Iyzipay from 'iyzipay';
import crypto from 'crypto';

// iyzico yapılandırması
const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || '',
  secretKey: process.env.IYZICO_SECRET_KEY || '',
  uri: process.env.IYZICO_URI || 'https://api.iyzipay.com', // Test: https://sandbox-api.iyzipay.com
});

export interface IyzicoPaymentRequest {
  price: number;
  paidPrice: number;
  currency: string;
  basketId: string;
  paymentCard: {
    cardHolderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
    cvc: string;
    registerCard?: number;
  };
  buyer: {
    id: string;
    name: string;
    surname: string;
    gsmNumber: string;
    email: string;
    identityNumber: string;
    registrationAddress: string;
    city: string;
    country: string;
    zipCode: string;
  };
  shippingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  billingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  basketItems: Array<{
    id: string;
    name: string;
    category1: string;
    itemType: string;
    price: number;
  }>;
}

export interface IyzicoPaymentResponse {
  status: string;
  errorCode?: string;
  errorMessage?: string;
  paymentId?: string;
  conversationId?: string;
  price?: number;
  paidPrice?: number;
  currency?: string;
  paymentStatus?: string;
  fraudStatus?: number;
  merchantCommissionRate?: number;
  merchantCommissionRateAmount?: number;
  iyziCommissionRateAmount?: number;
  iyziCommissionFee?: number;
  cardType?: string;
  cardAssociation?: string;
  cardFamily?: string;
  binNumber?: string;
  lastFourDigits?: string;
  basketId?: string;
}

/**
 * iyzico ile ödeme oluştur
 */
export async function createIyzicoPayment(
  request: IyzicoPaymentRequest
): Promise<{ success: boolean; data?: IyzicoPaymentResponse; error?: string }> {
  try {
    // iyzico API key kontrolü
    if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
      return {
        success: false,
        error: 'iyzico API anahtarları yapılandırılmamış',
      };
    }

    const paymentRequest = {
      locale: 'tr',
      conversationId: request.basketId,
      price: request.price.toFixed(2),
      paidPrice: request.paidPrice.toFixed(2),
      currency: request.currency,
      basketId: request.basketId,
      paymentCard: request.paymentCard,
      buyer: request.buyer,
      shippingAddress: request.shippingAddress,
      billingAddress: request.billingAddress,
      basketItems: request.basketItems,
    };

    return new Promise((resolve) => {
      iyzipay.payment.create(paymentRequest, (err: any, result: any) => {
        if (err) {
          console.error('iyzico payment error:', err);
          resolve({
            success: false,
            error: err.message || 'Ödeme işlemi başarısız',
          });
        } else {
          if (result.status === 'success') {
            resolve({
              success: true,
              data: result as IyzicoPaymentResponse,
            });
          } else {
            resolve({
              success: false,
              error: result.errorMessage || 'Ödeme işlemi başarısız',
            });
          }
        }
      });
    });
  } catch (error) {
    console.error('iyzico payment exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ödeme işlemi sırasında bir hata oluştu',
    };
  }
}

/**
 * iyzico ödeme durumunu kontrol et
 */
export async function checkIyzicoPaymentStatus(
  paymentId: string
): Promise<{ success: boolean; data?: IyzicoPaymentResponse; error?: string }> {
  try {
    if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
      return {
        success: false,
        error: 'iyzico API anahtarları yapılandırılmamış',
      };
    }

    return new Promise((resolve) => {
      iyzipay.payment.retrieve(
        {
          locale: 'tr',
          paymentId: paymentId,
        },
        (err: any, result: any) => {
          if (err) {
            console.error('iyzico payment retrieve error:', err);
            resolve({
              success: false,
              error: err.message || 'Ödeme durumu kontrol edilemedi',
            });
          } else {
            if (result.status === 'success') {
              resolve({
                success: true,
                data: result as IyzicoPaymentResponse,
              });
            } else {
              resolve({
                success: false,
                error: result.errorMessage || 'Ödeme durumu kontrol edilemedi',
              });
            }
          }
        }
      );
    });
  } catch (error) {
    console.error('iyzico payment retrieve exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ödeme durumu kontrol edilirken bir hata oluştu',
    };
  }
}

/**
 * iyzico callback doğrulama
 */
export function verifyIyzicoCallback(
  token: string,
  conversationId: string
): boolean {
  try {
    // iyzico callback doğrulama mantığı
    // Gerçek uygulamada iyzico'nun gönderdiği token'ı doğrulamalısınız
    return true;
  } catch (error) {
    console.error('iyzico callback verification error:', error);
    return false;
  }
}



