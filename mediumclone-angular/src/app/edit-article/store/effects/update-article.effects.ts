import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { UpdateArticleService } from '../../services/update-article.service';
import { UpdateArticleActions } from '../actions/update-article.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UpdateArticleEffect {
  constructor(
    private actions$: Actions,
    private updateArticleService: UpdateArticleService,
    private router: Router
  ) {}

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateArticleActions.updateArticle),
      switchMap(({ slug, articleInput }) => {
        return this.updateArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return UpdateArticleActions.updateArticleSuccess({
              article,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              UpdateArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UpdateArticleActions.updateArticleSuccess),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    { dispatch: false }
  );
}
