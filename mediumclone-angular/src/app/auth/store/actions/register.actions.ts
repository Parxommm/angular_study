import { createActionGroup, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../../types/register-request.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const RegisterActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register start': props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
