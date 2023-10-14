import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';

import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { GetArticleActions } from '../../store/actions/get-article.actions';
import { editArticleStateSelectors } from '../../store/selectors/edit-article.selectors';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { UpdateArticleActions } from '../../store/actions/update-article.actions';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  constructor(private store: Store, private route: ActivatedRoute) {}

  initialValues$: Observable<ArticleInputInterface>;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface>;
  slug: string;
  isLoading$: Observable<boolean>;

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  fetchData() {
    this.store.dispatch(GetArticleActions.getArticle({ slug: this.slug }));
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(
      select(editArticleStateSelectors.selectIsSubmitting)
    );
    this.backendErrors$ = this.store.pipe(
      select(editArticleStateSelectors.selectValidationErrors)
    );
    this.isLoading$ = this.store.pipe(
      select(editArticleStateSelectors.selectIsLoading)
    );
    this.initialValues$ = this.store.pipe(
      select(editArticleStateSelectors.selectArticle),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(
      UpdateArticleActions.updateArticle({ articleInput, slug: this.slug })
    );
  }
}
