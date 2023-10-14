import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';

import { ArticleStateInterface } from '../../types/article-state.interface';
import { GetArticleActions } from '../actions/get-article.actions';

const initialState: ArticleStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

export const ArticleStateFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(
      GetArticleActions.getArticle,
      (state): ArticleStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      GetArticleActions.getArticleSuccess,
      (state, action): ArticleStateInterface => ({
        ...state,
        isLoading: false,
        data: action.article,
      })
    ),
    on(
      GetArticleActions.getArticleFailure,
      (state): ArticleStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(routerNavigatedAction, (): ArticleStateInterface => initialState)
  ),
});
