import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsService } from './services/popular-tags.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GetPopularTagsEffect } from './store/effects/get-popular-tags.effects';
import { PopularTagsStateFeature } from './store/reducers/popular-tags.reducer';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';
import { LoadingModule } from '../banner/loading/loading.module';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature(GetPopularTagsEffect),
    StoreModule.forFeature(PopularTagsStateFeature),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
  ],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
  declarations: [PopularTagsComponent],
})
export class PopularTagsModule {}
