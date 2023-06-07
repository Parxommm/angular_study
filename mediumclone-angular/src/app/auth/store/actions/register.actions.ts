import { createActionGroup, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../../types/register-request.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const RegisterActions = createActionGroup({
  source: 'Register',
  events: {
    '[Auth] Register': props<{ request: RegisterRequestInterface }>(),
    '[Auth] Register success': props<{ currentUser: CurrentUserInterface }>(),
    '[Auth] Register failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
