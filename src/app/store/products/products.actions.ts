// src/app/store/products/products.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsByPage = createAction('[Products] Load Products by page', props<{ page: number }>());
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: any[] }>());
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: any }>());
