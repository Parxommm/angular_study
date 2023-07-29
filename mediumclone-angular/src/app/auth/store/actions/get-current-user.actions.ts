import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';

export const GetCurrentUserActions = createActionGroup({
  source: 'User',
  events: {
    'Get current user': emptyProps(),
    'Get current user success': props<{
      currentUser: CurrentUserInterface;
    }>(),
    'Get current user failure': emptyProps(),
  },
});
