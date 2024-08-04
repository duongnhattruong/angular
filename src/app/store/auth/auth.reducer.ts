import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { username }) => ({
    ...state,
    isLoggedIn: true,
    username
  })),
  on(AuthActions.loginFailure, (state) => {
    return ({
      ...state,
      isLoggedIn: false,
      username: ''
    })
  }),
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoggedIn: false,
    username: null
  }))
);
