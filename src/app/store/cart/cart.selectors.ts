// src/app/store/cart/cart.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCartState = createFeatureSelector<any[]>('cart');

export const selectAllCartItems = createSelector(
  selectCartState,
  (state: any[]) => state
);
