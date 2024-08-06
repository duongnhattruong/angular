import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

export const selectUsername = createSelector(
  selectAuthState,
  (state: AuthState) => state.username
);

export const selectRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.role
);
