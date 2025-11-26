import { executeQuery, executeQueryOne, executeNonQuery } from '../db';

export interface UserAddress {
  id: number;
  userId: number;
  title: string; // "Ev", "İş", "Diğer" gibi
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserAddressDto {
  userId: number;
  title: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export class UserAddressRepository {
  // Get all addresses for a user
  static async findByUserId(userId: number): Promise<UserAddress[]> {
    try {
      const addresses = await executeQuery<any>(
        `SELECT id, user_id as userId, title, full_name as fullName, phone, address, 
                city, district, postal_code as postalCode, country, is_default as isDefault,
                created_at as createdAt, updated_at as updatedAt
         FROM user_addresses 
         WHERE user_id = @userId 
         ORDER BY is_default DESC, created_at DESC`,
        { userId }
      );

      return addresses.map(addr => ({
        ...addr,
        createdAt: new Date(addr.createdAt),
        updatedAt: new Date(addr.updatedAt),
      }));
    } catch (error) {
      console.error('Error finding addresses by user ID:', error);
      return [];
    }
  }

  // Get address by ID
  static async findById(id: number): Promise<UserAddress | null> {
    try {
      const address = await executeQueryOne<any>(
        `SELECT id, user_id as userId, title, full_name as fullName, phone, address, 
                city, district, postal_code as postalCode, country, is_default as isDefault,
                created_at as createdAt, updated_at as updatedAt
         FROM user_addresses 
         WHERE id = @id`,
        { id }
      );

      if (!address) return null;

      return {
        ...address,
        createdAt: new Date(address.createdAt),
        updatedAt: new Date(address.updatedAt),
      };
    } catch (error) {
      console.error('Error finding address by ID:', error);
      return null;
    }
  }

  // Get default address for user
  static async findDefaultByUserId(userId: number): Promise<UserAddress | null> {
    try {
      const address = await executeQueryOne<any>(
        `SELECT id, user_id as userId, title, full_name as fullName, phone, address, 
                city, district, postal_code as postalCode, country, is_default as isDefault,
                created_at as createdAt, updated_at as updatedAt
         FROM user_addresses 
         WHERE user_id = @userId AND is_default = 1`,
        { userId }
      );

      if (!address) return null;

      return {
        ...address,
        createdAt: new Date(address.createdAt),
        updatedAt: new Date(address.updatedAt),
      };
    } catch (error) {
      console.error('Error finding default address:', error);
      return null;
    }
  }

  // Create new address
  static async create(data: CreateUserAddressDto): Promise<UserAddress> {
    try {
      // If this is set as default, unset other defaults first
      if (data.isDefault) {
        await executeNonQuery(
          'UPDATE user_addresses SET is_default = 0 WHERE user_id = @userId',
          { userId: data.userId }
        );
      }

      const result = await executeQueryOne<{ id: number }>(
        `INSERT INTO user_addresses (user_id, title, full_name, phone, address, city, district, postal_code, country, is_default, created_at, updated_at)
         OUTPUT INSERTED.id
         VALUES (@userId, @title, @fullName, @phone, @address, @city, @district, @postalCode, @country, @isDefault, GETDATE(), GETDATE())`,
        {
          userId: data.userId,
          title: data.title,
          fullName: data.fullName,
          phone: data.phone,
          address: data.address,
          city: data.city,
          district: data.district,
          postalCode: data.postalCode,
          country: data.country,
          isDefault: data.isDefault ? 1 : 0,
        }
      );

      if (!result) {
        throw new Error('Failed to create address');
      }

      const createdAddress = await this.findById(result.id);
      if (!createdAddress) {
        throw new Error('Failed to retrieve created address');
      }

      return createdAddress;
    } catch (error) {
      console.error('Error creating address:', error);
      throw error;
    }
  }

  // Update address
  static async update(id: number, data: Partial<CreateUserAddressDto>): Promise<boolean> {
    try {
      // If this is set as default, unset other defaults first
      if (data.isDefault && data.userId) {
        await executeNonQuery(
          'UPDATE user_addresses SET is_default = 0 WHERE user_id = @userId AND id != @id',
          { userId: data.userId, id }
        );
      }

      const fields: string[] = [];
      const params: any = { id };

      if (data.title !== undefined) {
        fields.push('title = @title');
        params.title = data.title;
      }
      if (data.fullName !== undefined) {
        fields.push('full_name = @fullName');
        params.fullName = data.fullName;
      }
      if (data.phone !== undefined) {
        fields.push('phone = @phone');
        params.phone = data.phone;
      }
      if (data.address !== undefined) {
        fields.push('address = @address');
        params.address = data.address;
      }
      if (data.city !== undefined) {
        fields.push('city = @city');
        params.city = data.city;
      }
      if (data.district !== undefined) {
        fields.push('district = @district');
        params.district = data.district;
      }
      if (data.postalCode !== undefined) {
        fields.push('postal_code = @postalCode');
        params.postalCode = data.postalCode;
      }
      if (data.country !== undefined) {
        fields.push('country = @country');
        params.country = data.country;
      }
      if (data.isDefault !== undefined) {
        fields.push('is_default = @isDefault');
        params.isDefault = data.isDefault ? 1 : 0;
      }

      if (fields.length === 0) {
        return true; // Nothing to update
      }

      fields.push('updated_at = GETDATE()');

      const rowsAffected = await executeNonQuery(
        `UPDATE user_addresses SET ${fields.join(', ')} WHERE id = @id`,
        params
      );

      return rowsAffected > 0;
    } catch (error) {
      console.error('Error updating address:', error);
      return false;
    }
  }

  // Delete address
  static async delete(id: number): Promise<boolean> {
    try {
      const rowsAffected = await executeNonQuery(
        'DELETE FROM user_addresses WHERE id = @id',
        { id }
      );

      return rowsAffected > 0;
    } catch (error) {
      console.error('Error deleting address:', error);
      return false;
    }
  }

  // Set address as default
  static async setAsDefault(id: number, userId: number): Promise<boolean> {
    try {
      // First, unset all defaults for this user
      await executeNonQuery(
        'UPDATE user_addresses SET is_default = 0 WHERE user_id = @userId',
        { userId }
      );

      // Then set this address as default
      const rowsAffected = await executeNonQuery(
        'UPDATE user_addresses SET is_default = 1, updated_at = GETDATE() WHERE id = @id AND user_id = @userId',
        { id, userId }
      );

      return rowsAffected > 0;
    } catch (error) {
      console.error('Error setting default address:', error);
      return false;
    }
  }
}