import { createFeature, createReducer, on } from '@ngrx/store';

import { FeedStateInterface } from '../../types/feed-state.interface';
import { GetFeedActions } from '../actions/get-feed.actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: FeedStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

export const feedStateFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(
      GetFeedActions.getFeed,
      (state): FeedStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      GetFeedActions.getFeedSuccess,
      (state, action): FeedStateInterface => ({
        ...state,
        isLoading: false,
        data: action.feed,
      })
    ),
    on(
      GetFeedActions.getFeedFailure,
      (state): FeedStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(routerNavigatedAction, (): FeedStateInterface => initialState)
  ),
});
