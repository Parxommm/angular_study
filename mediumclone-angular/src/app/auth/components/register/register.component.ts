import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RegisterActions } from '../../store/actions/register.actions';
import { authStateSelectors } from '../../store/selectors/auth-feature.selectors';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: '',
      email: '',
      password: '',
    });

    console.log(this.form.valid);
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select(authStateSelectors.selectIsSubmitting)
    );
    this.backendErrors$ = this.store.pipe(
      select(authStateSelectors.selectValidationErrors)
    );
  }

  onSubmit(): void {
    console.log(this.form.value);
    const request: RegisterRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(RegisterActions.registerStart({ request }));
  }
}
