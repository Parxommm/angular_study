import { ArticleStateFeature } from '../reducers/article-state.reducer';

const { selectArticleState, selectIsLoading, selectError, selectData } =
  ArticleStateFeature;

export const articleStateSelectors = {
  selectArticleState,
  selectIsLoading,
  selectError,
  selectData,
};
