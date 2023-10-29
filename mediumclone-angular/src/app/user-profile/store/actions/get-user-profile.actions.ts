import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ProfileInterface } from 'src/app/shared/types/profile.interface';

export const GetUserProfileActions = createActionGroup({
  source: 'User profile',
  events: {
    'Get user profile': props<{ slug: string }>(),
    'Get user profile success': props<{
      userProfile: ProfileInterface;
    }>(),
    'Get user profile failure': emptyProps(),
  },
});
