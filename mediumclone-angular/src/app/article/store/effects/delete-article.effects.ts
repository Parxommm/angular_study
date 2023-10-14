import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { DeleteArticleActions } from '../actions/delete-article.actions';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Injectable()
export class DeleteArticleEffect {
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router
  ) {}

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteArticleActions.deleteArticle),
      switchMap(({ slug }) => {
        return this.articleService.deleteArticle(slug).pipe(
          map(() => DeleteArticleActions.deleteArticleSuccess()),
          catchError(() => {
            return of(DeleteArticleActions.deleteArticleFailure());
          })
        );
      })
    )
  );

  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DeleteArticleActions.deleteArticleSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
