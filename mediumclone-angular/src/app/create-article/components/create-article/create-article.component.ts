import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { createArticleStateSelectors } from '../../store/selectors/create-article.selectors';
import { CreateArticleActions } from '../../store/actions/create-article.actions';

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(
      select(createArticleStateSelectors.selectIsSubmitting)
    );
    this.backendErrors$ = this.store.pipe(
      select(createArticleStateSelectors.selectValidationErrors)
    );
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(CreateArticleActions.createArticle({ articleInput }));
  }
}
