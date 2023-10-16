import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../../types/auth-state.interface';
import { RegisterActions } from '../actions/register.actions';
import { LoginActions } from '../actions/login.actions';
import { GetCurrentUserActions } from '../actions/get-current-user.actions';
import { UpdateCurrentUserActions } from '../actions/update-current-user.actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

export const authStateFeature = createFeature({
  name: 'authState',
  reducer: createReducer(
    initialState,
    // Register
    on(
      RegisterActions.registerStart,
      (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),
    on(
      RegisterActions.registerSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser,
      })
    ),
    on(
      RegisterActions.registerFailure,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),
    // Login
    on(
      LoginActions.loginStart,
      (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),
    on(
      LoginActions.loginSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser,
      })
    ),
    on(
      LoginActions.loginFailure,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),
    // get current user
    on(
      GetCurrentUserActions.getCurrentUser,
      (state): AuthStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      GetCurrentUserActions.getCurrentUserSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.currentUser,
      })
    ),
    on(
      GetCurrentUserActions.getCurrentUserFailure,
      (state): AuthStateInterface => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        currentUser: null,
      })
    ),

    // update current user
    on(
      UpdateCurrentUserActions.updateCurrentUserSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        currentUser: action.currentUser,
      })
    )
  ),
});
