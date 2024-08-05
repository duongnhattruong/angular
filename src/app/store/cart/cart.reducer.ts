// src/app/store/cart/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addToCartSuccess } from './cart.actions';

export const initialState: string[] = []; // Change the state type to array of strings

const _cartReducer = createReducer(
  initialState,
  on(addToCartSuccess, (state, { id }) => [...state, id])
);

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
