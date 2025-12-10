import 'server-only';
import { executeQuery, executeQueryOne, executeNonQuery } from '@/lib/db';
import { CategoryInput } from '@/lib/validations/category-schema';

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  image: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  children?: Category[];
  parent?: Category;
  productCount?: number;
}

export class CategoryRepository {
  // Helper: Tarih formatla
  private parseSqlDate(dateStr: string | null): Date | null {
    if (!dateStr) return null;
    const normalized = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
    return new Date(normalized);
  }

  // ID'ye göre bul
  async findById(id: number, includeInactive: boolean = false): Promise<Category | null> {
    const result = await executeQueryOne<any>(
      `SELECT id, name, slug, parent_id as parentId, image, 
              display_order as displayOrder, is_active as isActive,
              CONVERT(VARCHAR(23), created_at, 126) as createdAt,
              CONVERT(VARCHAR(23), updated_at, 126) as updatedAt
       FROM categories 
       WHERE id = @id ${includeInactive ? '' : 'AND is_active = 1'}`,
      { id }
    );

    if (!result) return null;

    return {
      ...result,
      createdAt: this.parseSqlDate(result.createdAt)!,
      updatedAt: this.parseSqlDate(result.updatedAt)!,
    };
  }

  // Slug'a göre bul
  async findBySlug(slug: string, includeInactive: boolean = false): Promise<Category | null> {
    const result = await executeQueryOne<any>(
      `SELECT id, name, slug, parent_id as parentId, image, 
              display_order as displayOrder, is_active as isActive,
              CONVERT(VARCHAR(23), created_at, 126) as createdAt,
              CONVERT(VARCHAR(23), updated_at, 126) as updatedAt
       FROM categories 
       WHERE slug = @slug ${includeInactive ? '' : 'AND is_active = 1'}`,
      { slug }
    );

    if (!result) return null;

    return {
      ...result,
      createdAt: this.parseSqlDate(result.createdAt)!,
      updatedAt: this.parseSqlDate(result.updatedAt)!,
    };
  }

  // Tümünü getir (Hata veren kısım burasıydı, static kalktı)
  async getAll(includeInactive: boolean = false): Promise<Category[]> {
    const results = await executeQuery<any>(
      `SELECT id, name, slug, parent_id as parentId, image, 
              display_order as displayOrder, is_active as isActive,
              CONVERT(VARCHAR(23), created_at, 126) as createdAt,
              CONVERT(VARCHAR(23), updated_at, 126) as updatedAt
       FROM categories ${includeInactive ? '' : 'WHERE is_active = 1'}
       ORDER BY CASE WHEN parent_id IS NULL THEN 0 ELSE 1 END ASC, display_order ASC, name ASC`
    );

    return results.map(item => ({
      ...item,
      createdAt: this.parseSqlDate(item.createdAt)!,
      updatedAt: this.parseSqlDate(item.updatedAt)!,
    }));
  }

  // Kategori oluştur
  async create(data: CategoryInput): Promise<Category> {
    const result = await executeQueryOne<{ id: number }>(
      `INSERT INTO categories (name, slug, parent_id, image, display_order, is_active, created_at, updated_at)
       OUTPUT INSERTED.id
       VALUES (@name, @slug, @parentId, @image, @displayOrder, @isActive, GETDATE(), GETDATE())`,
      {
        name: data.name,
        slug: data.slug,
        parentId: data.parentId || null,
        image: data.image || null, // null kontrolü eklendi
        displayOrder: 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      }
    );

    if (!result) {
      throw new Error('Kategori oluşturulamadı.');
    }

    const category = await this.findById(result.id, true);
    if (!category) {
      throw new Error('Oluşturulan kategori getirilemedi.');
    }

    return category;
  }

  // Kategori güncelle
  async update(id: number, updates: Partial<CategoryInput>): Promise<Category | null> {
    const fields: string[] = [];
    const params: Record<string, any> = { id };

    if (updates.name !== undefined) {
      fields.push('name = @name');
      params.name = updates.name;
    }
    if (updates.slug !== undefined) {
      fields.push('slug = @slug');
      params.slug = updates.slug;
    }
    if (updates.parentId !== undefined) {
      fields.push('parent_id = @parentId');
      params.parentId = updates.parentId;
    }
    if (updates.isActive !== undefined) {
      fields.push('is_active = @isActive');
      params.isActive = updates.isActive;
    }
    if (updates.image !== undefined) {
      fields.push('image = @image');
      params.image = updates.image;
    }

    if (fields.length === 0) {
      return await this.findById(id, true);
    }

    fields.push('updated_at = GETDATE()');

    await executeNonQuery(
      `UPDATE categories SET ${fields.join(', ')} WHERE id = @id`,
      params
    );

    return await this.findById(id, true);
  }

  // Kategori sil
  async delete(id: number): Promise<boolean> {
    const childrenResult = await executeQuery<any>(
        'SELECT TOP 1 1 FROM categories WHERE parent_id = @id', { id }
    );
    
    if (childrenResult.length > 0) {
      throw new Error('Alt kategorileri olan bir kategori silinemez.');
    }

    const rowsAffected = await executeNonQuery(
      'DELETE FROM categories WHERE id = @id',
      { id }
    );
    return rowsAffected > 0;
  }

  // Ağaç yapısı
  async findCategoryTree(includeInactive: boolean = false): Promise<Category[]> {
    const allCategories = await this.getAll(includeInactive);
    
    const categoryMap = new Map<number, Category>();
    const rootCategories: Category[] = [];

    allCategories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, children: [] });
    });

    allCategories.forEach(cat => {
      const category = categoryMap.get(cat.id)!;
      if (cat.parentId === null) {
        rootCategories.push(category);
      } else {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(category);
        }
      }
    });

    return rootCategories;
  }
}