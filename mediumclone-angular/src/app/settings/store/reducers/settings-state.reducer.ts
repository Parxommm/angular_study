import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';

import { SettingsStateInterface } from '../../types/settings-state.interface';
import { UpdateCurrentUserActions } from 'src/app/auth/store/actions/update-current-user.actions';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

export const settingsStateFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(
      UpdateCurrentUserActions.updateCurrentUser,
      (state): SettingsStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      UpdateCurrentUserActions.updateCurrentUserSuccess,
      (state): SettingsStateInterface => ({
        ...state,
        isSubmitting: false,
      })
    ),
    on(
      UpdateCurrentUserActions.updateCurrentUserFailure,
      (state, action): SettingsStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    )
  ),
});
