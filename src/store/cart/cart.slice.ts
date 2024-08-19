import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { IAddToCartPayload, ICartInitialState, IChangeQuantityPayload } from './cart.types';

const initialState: ICartInitialState = {
  items: [],
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const isExist = state.items.some(item => item.product.id === action.payload.product.id);

      if (!isExist) {
        state.items.push({
          ...action.payload,
          id: state.items.length,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const item = state.items.find(item => item.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.type === 'plus' ? item.quantity + 1 : item.quantity - 1;
      }
    },
    reset: state => {
      state.items = [];
    }
  },
});