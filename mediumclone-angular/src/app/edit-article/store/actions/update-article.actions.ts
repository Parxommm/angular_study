import { createActionGroup, props } from '@ngrx/store';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const UpdateArticleActions = createActionGroup({
  source: 'Update Article',
  events: {
    'Update article': props<{
      slug: string;
      articleInput: ArticleInputInterface;
    }>(),
    'Update article success': props<{
      article: ArticleInterface;
    }>(),
    'Update article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
