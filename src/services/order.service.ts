import { axiosWithAuth } from "@/api/api.interceptors";
import { EnumOrderStatus, IPaymentResponse } from "@/app/shared/types/order.interface"
import { API_URL } from "@/config/api.config";

type TypeData = {
  status?: EnumOrderStatus;
  items: {
    quantity: number;
    price: number;
    productId: string;
    storeId: string;
  }[];
}

class OrderService {
  async place(data: TypeData) {
    return axiosWithAuth<IPaymentResponse>({
      url: API_URL.orders('/place'),
      method: 'POST',
      data,
    });
  }
}

export const orderService = new OrderService();