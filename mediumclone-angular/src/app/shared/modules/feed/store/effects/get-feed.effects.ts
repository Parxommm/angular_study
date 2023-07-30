import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { FeedService } from '../../services/feed.service';
import { GetFeedActions } from '../actions/get-feed.actions';
import { GetFeedResponseInterface } from '../../types/get-feed-response.interface';

@Injectable()
export class GetFeedEffect {
  constructor(private actions$: Actions, private feedService: FeedService) {}

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetFeedActions.getFeed),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return GetFeedActions.getFeedSuccess({
              feed,
            });
          }),
          catchError(() => {
            return of(GetFeedActions.getFeedFailure());
          })
        );
      })
    )
  );
}
