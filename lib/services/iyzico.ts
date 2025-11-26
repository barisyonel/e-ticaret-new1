import Iyzipay from 'iyzipay';

// iyzico Configuration
const getIyzicoConfig = (): any => {
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const baseUrl = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

  if (!apiKey || !secretKey) {
    throw new Error('IYZICO_API_KEY ve IYZICO_SECRET_KEY environment variables gerekli');
  }

  return {
    apiKey,
    secretKey,
    uri: baseUrl,
  };
};

// Initialize iyzico client
const iyzipay = new Iyzipay(getIyzicoConfig());

export interface CreatePaymentRequest {
  price: string;
  paidPrice: string;
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
    identityNumber?: string;
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
    category2?: string;
    itemType: string;
    price: string;
  }>;
  callbackUrl?: string;
}

export interface PaymentResponse {
  status: string;
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
  locale?: string;
  systemTime?: number;
  conversationId?: string;
  paymentId?: string;
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
  currency?: string;
  itemTransactions?: Array<{
    itemId: string;
    paymentTransactionId: string;
    transactionStatus: number;
    price: number;
    paidPrice: number;
    merchantCommissionRate: number;
    merchantCommissionRateAmount: number;
    iyziCommissionRateAmount: number;
    iyziCommissionFee: number;
    blockageRate: number;
    blockageRateAmountMerchant: number;
    blockageRateAmountSubMerchant: number;
    blockageResolvedDate?: string;
    subMerchantPrice?: number;
    subMerchantPayoutRate?: number;
    subMerchantPayoutAmount?: number;
    merchantPayoutAmount?: number;
    convertedPayout?: {
      paidPrice: number;
      iyziCommissionRateAmount: number;
      iyziCommissionFee: number;
      blockageRateAmountMerchant: number;
      convertedPayoutAmount: number;
    };
  }>;
  connectorName?: string;
  authCode?: string;
  hostReference?: string;
  phase?: string;
  price?: number;
  paidPrice?: number;
}

/**
 * Create payment with iyzico
 */
export async function createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
  return new Promise((resolve, reject) => {
    iyzipay.payment.create(request, (err: any, result: PaymentResponse) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

/**
 * Retrieve payment result
 */
export async function retrievePayment(paymentId: string): Promise<PaymentResponse> {
  return new Promise((resolve, reject) => {
    iyzipay.payment.retrieve(
      {
        paymentId,
      },
      (err: any, result: PaymentResponse) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
}

/**
 * Cancel payment
 */
export async function cancelPayment(
  paymentId: string,
  ip: string,
  reason?: string
): Promise<PaymentResponse> {
  return new Promise((resolve, reject) => {
    iyzipay.cancel.create(
      {
        paymentId,
        ip,
        reason: reason || 'İptal edildi',
      },
      (err: any, result: PaymentResponse) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
}

/**
 * Refund payment
 */
export async function refundPayment(
  paymentId: string,
  ip: string,
  price?: number
): Promise<PaymentResponse> {
  return new Promise((resolve, reject) => {
    iyzipay.refund.create(
      {
        paymentId,
        ip,
        price,
      },
      (err: any, result: PaymentResponse) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
}

export default iyzipay;



