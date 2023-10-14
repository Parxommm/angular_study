import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { CreateArticleService } from '../../services/create-article.service';
import { CreateArticleActions } from '../actions/create-article.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CreateArticleEffect {
  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateArticleActions.createArticle),
      switchMap(({ articleInput }) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return CreateArticleActions.createArticleSuccess({
              article,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              CreateArticleActions.createArticleFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateArticleActions.createArticleSuccess),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    { dispatch: false }
  );
}
