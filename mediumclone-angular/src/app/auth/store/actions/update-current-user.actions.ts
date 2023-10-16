import { createActionGroup, props } from '@ngrx/store';

import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/current-user-input.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';

export const UpdateCurrentUserActions = createActionGroup({
  source: 'User',
  events: {
    'Update current user': props<{
      currentUserInput: CurrentUserInputInterface;
    }>(),
    'Update current user success': props<{
      currentUser: CurrentUserInterface;
    }>(),
    'Update current user failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
