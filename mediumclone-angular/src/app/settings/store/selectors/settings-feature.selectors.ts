import { settingsStateFeature } from '../reducers/settings-state.reducer';

const { selectIsSubmitting, selectValidationErrors } = settingsStateFeature;

export const settingsStateSelectors = {
  selectIsSubmitting,
  selectValidationErrors,
};
