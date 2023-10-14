import { createFeature, createReducer, on } from '@ngrx/store';

import { EditArticleStateInterface } from '../../types/edit-article-state.interface';
import { UpdateArticleActions } from '../actions/update-article.actions';
import { GetArticleActions } from '../actions/get-article.actions';

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  article: null,
  isLoading: false,
};

export const editArticleStateFeature = createFeature({
  name: 'Edit article',
  reducer: createReducer(
    initialState,
    on(
      UpdateArticleActions.updateArticle,
      (state): EditArticleStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      UpdateArticleActions.updateArticleSuccess,
      (state): EditArticleStateInterface => ({
        ...state,
        isSubmitting: false,
      })
    ),
    on(
      UpdateArticleActions.updateArticleFailure,
      (state, action): EditArticleStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),

    on(
      GetArticleActions.getArticle,
      (state): EditArticleStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      GetArticleActions.getArticleSuccess,
      (state, action): EditArticleStateInterface => ({
        ...state,
        isLoading: false,
        article: action.article,
      })
    ),
    on(
      GetArticleActions.getArticleFailure,
      (state): EditArticleStateInterface => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});
