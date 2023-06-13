import { createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../../types/auth-state.interface';
import { RegisterActions } from '../actions/register.actions';
import { LoginActions } from '../actions/login.actions';
import { GetCurrentUserActions } from '../actions/get-current-user.actions';
import { state } from '@angular/animations';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const authStateReducer = createReducer(
  initialState,
  // Register
  on(
    RegisterActions['[Auth]Register'],
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    RegisterActions['[Auth]RegisterSuccess'],
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    RegisterActions['[Auth]RegisterFailure'],
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  // Login
  on(
    LoginActions['[Auth]Login'],
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    LoginActions['[Auth]LoginSuccess'],
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    LoginActions['[Auth]LoginFailure'],
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  // get current user
  on(
    GetCurrentUserActions['[Auth]GetCurrentUser'],
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    GetCurrentUserActions['[Auth]GetCurrentUserSuccess'],
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    GetCurrentUserActions['[Auth]GetCurrentUserFailure'],
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  )
);

export { authStateReducer };
