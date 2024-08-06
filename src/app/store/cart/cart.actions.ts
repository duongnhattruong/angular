// src/app/store/cart/cart.actions.ts
import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ id: string }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add to Cart Success',
  props<{ id: string }>()
);

export const resetIsSuccessful = createAction(
  '[Cart] reset Cart Success'
);
