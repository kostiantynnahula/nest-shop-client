import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { IStore, IStoreCreate, IStoreUpdate } from "@/app/shared/types/store.interface";
import { API_URL } from "@/config/api.config";

class StoreService {
  async getByStoreId(id: string) {
    const { data } = await axiosClassic<IStore[]>({
      url: API_URL.stores(`/store/${id}`),
      method: 'GET',
    });

    return data;
  }

  async getById(id: string) {
    const { data } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'GET',
    });

    return data;
  }

  async create(data: IStoreCreate) {
    const { data: store } = await axiosWithAuth<IStore>({
      url: API_URL.stores(),
      method: 'POST',
      data,
    })

    return store;
  }

  async update(id: string, data: IStoreUpdate) {
    const { data: store } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'PATCH',
      data,
    })

    return store;
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'DELETE',
    });

    return data;
  }
}

export const storeService = new StoreService();