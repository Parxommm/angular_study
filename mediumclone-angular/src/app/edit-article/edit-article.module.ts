import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';

import { UpdateArticleService } from './services/update-article.service';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { GetArticleEffect } from './store/effects/get-article.effects';
import { UpdateArticleEffect } from './store/effects/update-article.effects';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { LoadingModule } from '../shared/modules/banner/loading/loading.module';
import { editArticleStateFeature } from './store/reducers/edit-article-state.reducer';

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature(GetArticleEffect, UpdateArticleEffect),
    StoreModule.forFeature(editArticleStateFeature),
    LoadingModule,
  ],
  providers: [UpdateArticleService, SharedArticleService],
})
export class EditArticleModule {}
