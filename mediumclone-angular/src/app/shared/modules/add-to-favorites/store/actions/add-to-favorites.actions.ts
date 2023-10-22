import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const AddToFavoritesActions = createActionGroup({
  source: 'Like',
  events: {
    'Toggle like': props<{ isFavorited: boolean; slug: string }>(),
    'Toggle like success': props<{
      article: ArticleInterface;
    }>(),
    'Toggle like failure': emptyProps(),
  },
});
