import { feedStateFeature } from '../reducers/feed-state.reducer';

const { selectFeedState, selectIsLoading, selectError, selectData } =
  feedStateFeature;

export const feedStateSelectors = {
  selectFeedState,
  selectIsLoading,
  selectError,
  selectData,
};
