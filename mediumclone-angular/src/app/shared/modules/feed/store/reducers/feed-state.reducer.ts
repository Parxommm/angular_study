import { createReducer, on } from '@ngrx/store';

import { FeedStateInterface } from '../../types/feed-state.interface';
import { GetFeedActions } from '../actions/get-feed.actions';

const initialState: FeedStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

const feedStateReducer = createReducer(
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
  )
);

export { feedStateReducer };
