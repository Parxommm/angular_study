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
