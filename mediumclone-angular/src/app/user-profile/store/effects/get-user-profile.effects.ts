import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { GetUserProfileActions } from '../actions/get-user-profile.actions';
import { UserProfileService } from '../../services/user-profile.service';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';

@Injectable()
export class GetUserProfileEffect {
  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUserProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: ProfileInterface) => {
            return GetUserProfileActions.getUserProfileSuccess({
              userProfile,
            });
          }),
          catchError(() => {
            return of(GetUserProfileActions.getUserProfileFailure());
          })
        );
      })
    )
  );
}
