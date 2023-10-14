import { createFeature, createReducer, on } from '@ngrx/store';

import { CreateArticleStateInterface } from '../../types/create-article-state.interface';
import { CreateArticleActions } from '../actions/create-article.actions';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

export const createArticleStateFeature = createFeature({
  name: 'create article',
  reducer: createReducer(
    initialState,
    on(
      CreateArticleActions.createArticle,
      (state): CreateArticleStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      CreateArticleActions.createArticleSuccess,
      (state): CreateArticleStateInterface => ({
        ...state,
        isSubmitting: false,
      })
    ),
    on(
      CreateArticleActions.createArticleFailure,
      (state, action): CreateArticleStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    )
  ),
});
