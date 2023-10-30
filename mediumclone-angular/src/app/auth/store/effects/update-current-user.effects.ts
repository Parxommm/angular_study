import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { UpdateCurrentUserActions } from '../actions/update-current-user.actions';

@Injectable()
export class UpdateCurrentUserEffect {
  constructor(private actions$: Actions, private authService: AuthService) {}

  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCurrentUserActions.updateCurrentUser),
      switchMap(({ currentUserInput }) => {
        return this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: CurrentUserInterface) => {
            return UpdateCurrentUserActions.updateCurrentUserSuccess({
              currentUser,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              UpdateCurrentUserActions.updateCurrentUserFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    )
  );
}
