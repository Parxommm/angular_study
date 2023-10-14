import { editArticleStateFeature } from '../reducers/edit-article-state.reducer';

const {
  selectIsSubmitting,
  selectValidationErrors,
  selectArticle,
  selectIsLoading,
} = editArticleStateFeature;

export const editArticleStateSelectors = {
  selectIsSubmitting,
  selectValidationErrors,
  selectArticle,
  selectIsLoading,
};
