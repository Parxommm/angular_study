import { createArticleStateFeature } from '../reducers/create-article-state.reducer';

const { selectIsSubmitting, selectValidationErrors } =
  createArticleStateFeature;

export const createArticleStateSelectors = {
  selectIsSubmitting,
  selectValidationErrors,
};
