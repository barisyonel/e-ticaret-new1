'use server';

import { z } from 'zod';
import { requireUser } from '@/lib/requireUser';
import { UserAddressRepository, CreateUserAddressDto } from '@/lib/repositories/UserAddressRepository';

export interface ActionResponse<T = void> {
  success: boolean;
  error?: string;
  data?: T;
}

// Validation schema
const addressSchema = z.object({
  title: z.string().min(1, 'Adres başlığı gereklidir').max(50, 'Adres başlığı çok uzun'),
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır').max(255, 'Ad soyad çok uzun'),
  phone: z.string().min(10, 'Telefon numarası geçersiz').max(20, 'Telefon numarası çok uzun'),
  address: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
  city: z.string().min(2, 'Şehir gereklidir').max(100, 'Şehir adı çok uzun'),
  district: z.string().min(2, 'İlçe gereklidir').max(100, 'İlçe adı çok uzun'),
  postalCode: z.string().min(5, 'Posta kodu geçersiz').max(10, 'Posta kodu çok uzun'),
  country: z.string().min(2, 'Ülke gereklidir').max(100, 'Ülke adı çok uzun'),
  isDefault: z.boolean().optional(),
});

/**
 * Get user addresses
 */
export async function getUserAddresses(): Promise<ActionResponse<any[]>> {
  try {
    const user = await requireUser();
    const addresses = await UserAddressRepository.findByUserId(user.id);

    return {
      success: true,
      data: addresses,
    };
  } catch (error: any) {
    console.error('Get user addresses error:', error);
    return {
      success: false,
      error: error.message || 'Adresler yüklenirken bir hata oluştu',
    };
  }
}

/**
 * Get address by ID
 */
export async function getAddressById(addressId: number): Promise<ActionResponse<any>> {
  try {
    const user = await requireUser();
    const address = await UserAddressRepository.findById(addressId);

    if (!address) {
      return {
        success: false,
        error: 'Adres bulunamadı',
      };
    }

    // Check if address belongs to user
    if (address.userId !== user.id) {
      return {
        success: false,
        error: 'Bu adrese erişim yetkiniz yok',
      };
    }

    return {
      success: true,
      data: address,
    };
  } catch (error: any) {
    console.error('Get address by ID error:', error);
    return {
      success: false,
      error: error.message || 'Adres yüklenirken bir hata oluştu',
    };
  }
}

/**
 * Create new address
 */
export async function createAddress(formData: FormData): Promise<ActionResponse<{ id: number }>> {
  try {
    const user = await requireUser();

    const rawData = {
      title: formData.get('title') as string,
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      district: formData.get('district') as string,
      postalCode: formData.get('postalCode') as string,
      country: (formData.get('country') as string) || 'Türkiye',
      isDefault: formData.get('isDefault') === 'true',
    };

    // Validate
    const validated = addressSchema.parse(rawData);

    // Create address
    const addressData: CreateUserAddressDto = {
      userId: user.id,
      ...validated,
    };

    const address = await UserAddressRepository.create(addressData);

    return {
      success: true,
      data: { id: address.id },
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    console.error('Create address error:', error);
    return {
      success: false,
      error: error.message || 'Adres oluşturulurken bir hata oluştu',
    };
  }
}

/**
 * Update address
 */
export async function updateAddress(addressId: number, formData: FormData): Promise<ActionResponse> {
  try {
    const user = await requireUser();

    // Check if address exists and belongs to user
    const existingAddress = await UserAddressRepository.findById(addressId);
    if (!existingAddress) {
      return {
        success: false,
        error: 'Adres bulunamadı',
      };
    }

    if (existingAddress.userId !== user.id) {
      return {
        success: false,
        error: 'Bu adrese erişim yetkiniz yok',
      };
    }

    const rawData = {
      title: formData.get('title') as string,
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      district: formData.get('district') as string,
      postalCode: formData.get('postalCode') as string,
      country: (formData.get('country') as string) || 'Türkiye',
      isDefault: formData.get('isDefault') === 'true',
    };

    // Validate
    const validated = addressSchema.parse(rawData);

    // Update address
    const updateData: Partial<CreateUserAddressDto> = {
      userId: user.id,
      ...validated,
    };

    const success = await UserAddressRepository.update(addressId, updateData);

    if (!success) {
      return {
        success: false,
        error: 'Adres güncellenirken bir hata oluştu',
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    console.error('Update address error:', error);
    return {
      success: false,
      error: error.message || 'Adres güncellenirken bir hata oluştu',
    };
  }
}

/**
 * Delete address
 */
export async function deleteAddress(addressId: number): Promise<ActionResponse> {
  try {
    const user = await requireUser();

    // Check if address exists and belongs to user
    const existingAddress = await UserAddressRepository.findById(addressId);
    if (!existingAddress) {
      return {
        success: false,
        error: 'Adres bulunamadı',
      };
    }

    if (existingAddress.userId !== user.id) {
      return {
        success: false,
        error: 'Bu adrese erişim yetkiniz yok',
      };
    }

    const success = await UserAddressRepository.delete(addressId);

    if (!success) {
      return {
        success: false,
        error: 'Adres silinirken bir hata oluştu',
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Delete address error:', error);
    return {
      success: false,
      error: error.message || 'Adres silinirken bir hata oluştu',
    };
  }
}

/**
 * Set address as default
 */
export async function setDefaultAddress(addressId: number): Promise<ActionResponse> {
  try {
    const user = await requireUser();

    // Check if address exists and belongs to user
    const existingAddress = await UserAddressRepository.findById(addressId);
    if (!existingAddress) {
      return {
        success: false,
        error: 'Adres bulunamadı',
      };
    }

    if (existingAddress.userId !== user.id) {
      return {
        success: false,
        error: 'Bu adrese erişim yetkiniz yok',
      };
    }

    const success = await UserAddressRepository.setAsDefault(addressId, user.id);

    if (!success) {
      return {
        success: false,
        error: 'Varsayılan adres ayarlanırken bir hata oluştu',
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Set default address error:', error);
    return {
      success: false,
      error: error.message || 'Varsayılan adres ayarlanırken bir hata oluştu',
    };
  }
}