import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { ArticleComponent } from './components/article/article.component';
import { LoadingModule } from '../shared/modules/banner/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/error-message/error-message.module';
import { GetArticleEffect } from './store/effects/get-article.effects';
import { ArticleStateFeature } from './store/reducers/feed-state.reducer';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature(GetArticleEffect),
    StoreModule.forFeature(ArticleStateFeature),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
  ],
  exports: [ArticleComponent],
  providers: [SharedArticleService],
})
export class ArticleModule {}
