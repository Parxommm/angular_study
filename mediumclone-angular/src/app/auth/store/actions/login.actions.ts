import { createActionGroup, props } from '@ngrx/store';

import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { LoginRequestInterface } from '../../types/login-request.interface';

export const LoginActions = createActionGroup({
  source: 'Login',
  events: {
    '[Auth] Login': props<{ request: LoginRequestInterface }>(),
    '[Auth] Login success': props<{ currentUser: CurrentUserInterface }>(),
    '[Auth] Login failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
