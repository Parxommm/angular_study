import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/get-feed.effects';
import { StoreModule } from '@ngrx/store';
import { feedStateReducer } from './store/reducers/auth-state.reducer';
import { FeedService } from './services/feed.service';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature(GetFeedEffect),
    StoreModule.forFeature('feed', feedStateReducer),
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
