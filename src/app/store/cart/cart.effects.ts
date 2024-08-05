// src/app/store/cart/cart.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { addToCart, addToCartSuccess } from './cart.actions';

@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      mergeMap(action =>
        this.cartService.addToCart(action.id).pipe(
          map(() => addToCartSuccess({ id: action.id })),
          catchError(() => of({ type: '[Cart] Add to Cart Failure' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService
  ) {}
}
