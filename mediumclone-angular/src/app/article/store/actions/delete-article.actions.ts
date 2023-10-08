import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DeleteArticleActions = createActionGroup({
  source: 'Article',
  events: {
    'Delete article': props<{ slug: string }>(),
    'Delete article success': emptyProps(),
    'Delete article failure': emptyProps(),
  },
});
