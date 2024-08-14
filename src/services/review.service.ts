import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { IReview, IReviewInput } from "@/app/shared/types/review.interface";
import { API_URL } from "@/config/api.config";

class ReviewService {
  async getByStoreId(id: string) {
    const { data } = await axiosClassic<IReview[]>({
      url: API_URL.reviews(`/store/${id}`),
      method: 'GET',
    });

    return data;
  }

  async create(data: IReviewInput, productId: string, storeId: string) {
    const { data: review } = await axiosWithAuth<IReview>({
      url: API_URL.reviews(`/${productId}/${storeId}`),
      method: 'POST',
      data,
    })

    return review;
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth<boolean>({
      url: API_URL.reviews(`/${id}`),
      method: 'DELETE',
    });

    return data;
  }
}

export const reviewService = new ReviewService();