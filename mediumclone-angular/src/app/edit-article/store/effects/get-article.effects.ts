import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleService } from 'src/app/shared/services/article.service';
import { GetArticleActions } from '../actions/get-article.actions';

@Injectable()
export class GetArticleEffect {
  constructor(
    private actions$: Actions,
    private sharedArticleService: ArticleService
  ) {}

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetArticleActions.getArticle),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return GetArticleActions.getArticleSuccess({
              article,
            });
          }),
          catchError(() => {
            return of(GetArticleActions.getArticleFailure());
          })
        );
      })
    )
  );
}
