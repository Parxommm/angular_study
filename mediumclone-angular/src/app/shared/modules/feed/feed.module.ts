import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/get-feed.effects';
import { StoreModule } from '@ngrx/store';
import { feedStateReducer } from './store/reducers/feed-state.reducer';
import { FeedService } from './services/feed.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'article',
  },
];

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature(GetFeedEffect),
    StoreModule.forFeature('feed', feedStateReducer),
    RouterModule,
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
