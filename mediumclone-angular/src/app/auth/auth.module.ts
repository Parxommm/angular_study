import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RegisterComponent } from './components/register/register.component';
import { authStateFeature } from './store/reducers/auth-state.reducer';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effects';
import { BackendErrorsMessagesModule } from '../shared/modules/backend-errors-messages/backend-errors-messages.module';
import { PersistenceService } from '../shared/services/persistence.service';
import { LoginEffect } from './store/effects/login.effects';
import { LoginComponent } from './components/login/login.component';
import { GetCurrentUserEffect } from './store/effects/get-current-user.effects';
import { UpdateCurrentUserEffect } from './store/effects/update-current-user.effects';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature(authStateFeature),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
    ]),
    BackendErrorsMessagesModule,
  ],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
