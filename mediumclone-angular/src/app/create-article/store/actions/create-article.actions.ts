import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const CreateArticleActions = createActionGroup({
  source: 'Article',
  events: {
    'Create article': props<{ articleInput: ArticleInputInterface }>(),
    'Create article success': props<{
      article: ArticleInterface;
    }>(),
    'Create article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
