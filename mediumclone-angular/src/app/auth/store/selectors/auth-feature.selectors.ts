import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthStateInterface } from '../../types/auth-state.interface';

import { authStateFeature } from '../reducers/auth-state.reducer';

const {
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoggedIn,
  selectCurrentUser,
} = authStateFeature;

export const authStateSelectors = {
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoggedIn,
  selectCurrentUser,
};
