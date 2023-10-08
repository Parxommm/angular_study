import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { ArticleComponent } from './components/article/article.component';
import { LoadingModule } from '../shared/modules/banner/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/error-message/error-message.module';
import { GetArticleEffect } from './store/effects/get-article.effects';
import { ArticleStateFeature } from './store/reducers/feed-state.reducer';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { TagListModule } from '../shared/modules/tag-list/tag-list.module';
import { ArticleService } from './services/article.service';
import { DeleteArticleEffect } from './store/effects/delete-article.effects';

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature(GetArticleEffect, DeleteArticleEffect),
    StoreModule.forFeature(ArticleStateFeature),
    RouterModule.forChild(routes),
    ErrorMessageModule,
    LoadingModule,
    TagListModule,
  ],
  exports: [],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
