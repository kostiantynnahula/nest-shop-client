import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { IProduct, IProductInput } from "@/app/shared/types/product.interface";
import { API_URL } from "@/config/api.config";

class ProductService {
  async getAll(searchTerm?: string | null) {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(),
      method: 'GET',
      params: searchTerm ? { searchTerm } : {},
    });

    return data || [];
  }

  async getByStoreId(id: string) {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(`/store/${id}`),
      method: 'GET',
    });

    return data || [];
  }

  async getById(id: string) {
    const { data } = await axiosClassic<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'GET',
    });

    return data;
  }

  async getByCategory(id: string) {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(`/category/${id}`),
      method: 'GET',
    });

    return data || [];
  }

  async getByMostPopular() {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(`/most-popular`),
      method: 'GET',
    });

    return data || [];
  }

  async getSimilar(id: string) {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(`/similar/${id}`),
      method: 'GET',
    });

    return data || [];
  }

  async create(data: IProductInput, storeId: string) {
    const { data: product } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`/${storeId}`),
      method: 'POST',
      data,
    })

    return product;
  }

  async update(id: string, data: IProductInput) {
    const { data: product } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'PATCH',
      data,
    })

    return product;
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth<boolean>({
      url: API_URL.products(`/${id}`),
      method: 'DELETE',
    });

    return data;
  }
}

export const productService = new ProductService();