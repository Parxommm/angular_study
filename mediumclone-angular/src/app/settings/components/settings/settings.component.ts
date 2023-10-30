import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';

import { authStateSelectors } from 'src/app/auth/store/selectors/auth-feature.selectors';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { settingsStateSelectors } from '../../store/selectors/settings-feature.selectors';
import { UpdateCurrentUserActions } from 'src/app/auth/store/actions/update-current-user.actions';
import { CurrentUserInputInterface } from 'src/app/shared/types/current-user-input.interface';
import { logoutAction } from 'src/app/auth/store/actions/sync.actions';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select(settingsStateSelectors.selectIsSubmitting)
    );
    this.backendErrors$ = this.store.pipe(
      select(settingsStateSelectors.selectValidationErrors)
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(authStateSelectors.selectCurrentUser), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(
      UpdateCurrentUserActions.updateCurrentUser({ currentUserInput })
    );
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
