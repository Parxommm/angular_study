import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { LoginActions } from '../actions/login.actions';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions['[Auth]Login']),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('accessToken', currentUser.token);
            return LoginActions['[Auth]LoginSuccess']({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              LoginActions['[Auth]LoginFailure']({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions['[Auth]LoginSuccess']),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );
}
