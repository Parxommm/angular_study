import { createActionGroup, props } from '@ngrx/store';

import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { LoginRequestInterface } from '../../types/login-request.interface';

export const LoginActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login start': props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
