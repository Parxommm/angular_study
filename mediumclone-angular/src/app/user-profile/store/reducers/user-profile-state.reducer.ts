import { createFeature, createReducer, on } from '@ngrx/store';

import { UserProfileStateInterface } from '../../types/user-profile-state.interface';
import { GetUserProfileActions } from '../actions/get-user-profile.actions';

const initialState: UserProfileStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

export const UserProfileStateFeature = createFeature({
  name: 'user profile',
  reducer: createReducer(
    initialState,
    on(
      GetUserProfileActions.getUserProfile,
      (state): UserProfileStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      GetUserProfileActions.getUserProfileSuccess,
      (state, action): UserProfileStateInterface => ({
        ...state,
        isLoading: false,
        data: action.userProfile,
      })
    ),
    on(
      GetUserProfileActions.getUserProfileFailure,
      (state): UserProfileStateInterface => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});
