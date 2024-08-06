import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { username, role }) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    return {
    ...state,
    isLoggedIn: true,
    username, 
    role
  }
}),
  on(AuthActions.loginFailure, (state) => {
    return {
      ...state,
      isLoggedIn: false,
      username: '',
      role: ''
    }
  }),
  on(AuthActions.logout, (state) => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    return {
      ...state,
      isLoggedIn: false,
      username: null,
      role: null
    };
  }),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isLoggedIn: false,
    username: null,
    role: null
  })),
  on(AuthActions.logoutFailure, (state) => ({
    ...state
  }))
);
