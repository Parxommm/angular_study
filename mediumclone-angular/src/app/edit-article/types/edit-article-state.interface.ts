import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export interface EditArticleStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
  isLoading: boolean;
  article: ArticleInputInterface | null;
}
