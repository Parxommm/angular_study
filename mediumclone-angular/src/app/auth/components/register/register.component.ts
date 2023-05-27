import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.actions';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: '',
      email: '',
      password: '',
    });

    console.log(this.form.valid);
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.store.dispatch(registerAction(this.form.value));
  }
}
