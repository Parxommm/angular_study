import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { CreateArticleService } from './services/create-article.service';
import { CreateArticleEffect } from './store/effects/create-article.effects';
import { createArticleStateFeature } from './store/reducers/create-article-state.reducer';

const routes: Routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature(CreateArticleEffect),
    StoreModule.forFeature(createArticleStateFeature),
  ],
  providers: [CreateArticleService],
})
export class CreateArticleModule {}
