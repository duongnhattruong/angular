import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.username, action.password).pipe(
          map(username => {
            if (username) {
              return AuthActions.loginSuccess({ username });
            } else {
              return AuthActions.loginFailure();
            }
          }),
          catchError(() => of(AuthActions.loginFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
