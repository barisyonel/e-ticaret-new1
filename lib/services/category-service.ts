// lib/services/category-service.ts
import { CategoryRepository } from "@/lib/repositories/CategoryRepository";
import { CategorySchema, CategoryInput } from "@/lib/validations/category-schema";

export class CategoryService {
  private repo = new CategoryRepository();

  async getAllCategories() {
    return await this.repo.getAll();
  }

  async createCategory(formData: CategoryInput) {
    // 1. Zod ile Validasyon
    const validation = CategorySchema.safeParse(formData);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    // 2. Slug Oluşturma (Eğer boş geldiyse)
    let finalSlug = validation.data.slug;
    if (!finalSlug) {
      finalSlug = validation.data.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
    }

    // 3. Veriyi Kaydet
    const dataToSave = { ...validation.data, slug: finalSlug };
    return await this.repo.create(dataToSave);
  }
}