// src/app/store/cart/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addToCart, addToCartSuccess, resetIsSuccessful } from './cart.actions';

export const initialState: string[] = []; // Change the state type to array of strings

const _cartReducer = createReducer(
  initialState,
  on(addToCartSuccess, (state, { id }) => ({
    ...state,
    id,
    isAddToCartSuccess: true
  })),
  on(addToCart, (state, { id }) => ({
    ...state,
    id,
    isAddToCartSuccess: false
  })),
  on(resetIsSuccessful, (state) => ({
    ...state,
    isAddToCartSuccess: false
  })),
);

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
