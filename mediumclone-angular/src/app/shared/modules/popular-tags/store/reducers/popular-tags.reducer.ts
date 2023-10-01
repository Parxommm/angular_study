import { createFeature, createReducer, on } from '@ngrx/store';

import { PopularTagsStateInterface } from '../../types/popular-tags-state.interface';
import { GetPopularTagsActions } from '../actions/get-popular-tags.actions';

const initialState: PopularTagsStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

export const PopularTagsStateFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(
      GetPopularTagsActions.getPopularTags,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      GetPopularTagsActions.getPopularTagsSuccess,
      (state, action): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
        data: action.popularTags,
      })
    ),
    on(
      GetPopularTagsActions.getPopularTagsFailure,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});
