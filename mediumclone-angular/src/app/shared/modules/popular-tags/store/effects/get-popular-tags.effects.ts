import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { PopularTagsService } from '../../services/popular-tags.service';
import { GetPopularTagsActions } from '../actions/get-popular-tags.actions';
import { PopularTagType } from 'src/app/shared/types/popular-tag.type';

@Injectable()
export class GetPopularTagsEffect {
  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}

  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPopularTagsActions.getPopularTags),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return GetPopularTagsActions.getPopularTagsSuccess({ popularTags });
          }),
          catchError(() => {
            return of(GetPopularTagsActions.getPopularTagsFailure());
          })
        );
      })
    )
  );
}
