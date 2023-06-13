import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { GetCurrentUserActions } from '../actions/get-current-user.actions';
import { PersistenceService } from 'src/app/shared/services/persistence.service';

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCurrentUserActions['[Auth]GetCurrentUser']),
      switchMap(() => {
        const token = this.persistenceService.get('accessToken');
        if (!token) {
          return of(GetCurrentUserActions['[Auth]GetCurrentUserFailure']());
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return GetCurrentUserActions['[Auth]GetCurrentUserSuccess']({
              currentUser,
            });
          }),
          catchError(() => {
            return of(GetCurrentUserActions['[Auth]GetCurrentUserFailure']());
          })
        );
      })
    )
  );
}
