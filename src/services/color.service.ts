import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { IColor, IColorInput } from "@/app/shared/types/color.interface";
import { API_URL } from "@/config/api.config";

class ColorsService {
  async getByStoreId(id: string) {
    const { data } = await axiosClassic<IColor[]>({
      url: API_URL.colors(`/store/${id}`),
      method: 'GET',
    });

    return data;
  }

  async getById(id: string) {
    const { data } = await axiosClassic<IColor[]>({
      url: API_URL.colors(`/${id}`),
      method: 'GET',
    });

    return data;
  }

  async create(data: IColorInput, storeId: string) {
    const { data: color } = await axiosWithAuth<IColor>({
      url: API_URL.colors(`/${storeId}`),
      method: 'POST',
      data,
    })

    return color;
  }

  async update(id: string, data: IColorInput) {
    const { data: color } = await axiosWithAuth<IColor>({
      url: API_URL.colors(`/${id}`),
      method: 'PATCH',
      data,
    })

    return color;
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth<boolean>({
      url: API_URL.colors(`/${id}`),
      method: 'DELETE',
    });

    return data;
  }
}

export const colorsService = new ColorsService();