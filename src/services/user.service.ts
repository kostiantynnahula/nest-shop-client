import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { IUser } from "@/app/shared/types/user.interface";
import { API_URL } from "@/config/api.config";

class UserService {
  async getProfile() {
    return await axiosClassic<IUser[]>({
      url: API_URL.users(`/profile`),
      method: 'GET',
    });
  }

  async toggleFavorite(storeId: string) {
    return await axiosWithAuth<boolean>({
      url: API_URL.users(`/profile/favorites/${storeId}`),
      method: 'PATCH',
    });
  }
}

export const userService = new UserService();