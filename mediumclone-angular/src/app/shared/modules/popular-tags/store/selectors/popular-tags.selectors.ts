import { PopularTagsStateFeature } from '../reducers/popular-tags.reducer';

const { selectPopularTagsState, selectIsLoading, selectError, selectData } =
  PopularTagsStateFeature;

export const PopularTagsStateSelectors = {
  selectPopularTagsState,
  selectIsLoading,
  selectError,
  selectData,
};
