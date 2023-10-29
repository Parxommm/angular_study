import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileService } from './services/user-profile.service';
import { EffectsModule } from '@ngrx/effects';
import { GetUserProfileEffect } from './store/effects/get-user-profile.effects';
import { StoreModule } from '@ngrx/store';
import { UserProfileStateFeature } from './store/reducers/user-profile-state.reducer';
import { FeedModule } from '../shared/modules/feed/feed.module';

const routes: Routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent,
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent,
  },
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(GetUserProfileEffect),
    StoreModule.forFeature(UserProfileStateFeature),
    FeedModule,
  ],
  providers: [UserProfileService],
})
export class UserProfileModule {}
