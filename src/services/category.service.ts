import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { ICategory, ICategoryInput } from "@/app/shared/types/category.interface";
import { API_URL } from "@/config/api.config";

class CategoryService {
  async getByStoreId(id: string) {
    const { data } = await axiosClassic<ICategory[]>({
      url: API_URL.categories(`/store/${id}`),
      method: 'GET',
    });

    return data;
  }

  async getById(id: string) {
    const { data } = await axiosClassic<ICategory>({
      url: API_URL.categories(`/${id}`),
      method: 'GET',
    });

    return data;
  }

  async create(data: ICategoryInput, storeId: string) {
    const { data: category } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`/${storeId}`),
      method: 'POST',
      data,
    })

    return category;
  }

  async update(id: string, data: ICategoryInput) {
    const { data: category } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`/${id}`),
      method: 'PATCH',
      data,
    })

    return category;
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth<boolean>({
      url: API_URL.categories(`/${id}`),
      method: 'DELETE',
    });

    return data;
  }
}

export const categoryService = new CategoryService();