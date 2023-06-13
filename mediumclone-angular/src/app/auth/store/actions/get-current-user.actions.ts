import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';

export const GetCurrentUserActions = createActionGroup({
  source: 'Auth',
  events: {
    '[Auth] Get current user': emptyProps(),
    '[Auth] Get current user success': props<{
      currentUser: CurrentUserInterface;
    }>(),
    '[Auth] Get current user failure': emptyProps(),
  },
});
