// src/app/store/cart/cart.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectIsAddToCartSuccessful = createSelector(
    selectCartState,
    (state) => state.isAddToCartSuccess
  );
 