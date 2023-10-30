import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AddToFavoritesActions } from '../actions/add-to-favorites.actions';
import { AddToFavoritesService } from '../../services/add-to-favorites.service';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

@Injectable()
export class AddToFavoritesEffect {
  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService
  ) {}

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddToFavoritesActions.toggleLike),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug);
        return article$.pipe(
          map((article: ArticleInterface) => {
            return AddToFavoritesActions.toggleLikeSuccess({
              article,
            });
          }),
          catchError(() => {
            return of(AddToFavoritesActions.toggleLikeFailure());
          })
        );
      })
    )
  );
}
