import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/get-feed.effects';
import { StoreModule } from '@ngrx/store';
import { feedStateFeature } from './store/reducers/feed-state.reducer';
import { FeedService } from './services/feed.service';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { LoadingModule } from '../banner/loading/loading.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TagListModule } from '../tag-list/tag-list.module';
import { AddToFavoritesModule } from '../add-to-favorites/add-to-favorites.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature(GetFeedEffect),
    StoreModule.forFeature(feedStateFeature),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    AddToFavoritesModule,
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
