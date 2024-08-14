import { IUser } from "./user.interface";

export interface IReview {
  id: string;
  text: string;
  rating: number;
  user: IUser;
  createAt: string;
}

export interface IReviewInput extends Pick<IReview, 'text' | 'rating'> {}