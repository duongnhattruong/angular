// src/app/store/products/products.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { ProductsState, initialProductsState } from './products.state';
import * as ProductsActions from './products.actions';

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products
  }))
);
