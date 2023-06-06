import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthStateInterface } from '../../types/authState.interface';

export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>('authState');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors
);
