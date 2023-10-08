import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, combineLatest, map } from 'rxjs';

import { GetArticleActions } from '../../store/actions/get-article.actions';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { articleStateSelectors } from '../../store/selectors/article.selectors';
import { authStateSelectors } from 'src/app/auth/store/selectors/auth-feature.selectors';
import { DeleteArticleActions } from '../../store/actions/delete-article.actions';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string = '';
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(
      select(articleStateSelectors.selectIsLoading)
    );
    this.error$ = this.store.pipe(select(articleStateSelectors.selectError));
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleStateSelectors.selectData)),
      this.store.pipe(select(authStateSelectors.selectCurrentUser)),
    ]).pipe(
      map(([article, currentUser]) => {
        if (!article || !currentUser) {
          return false;
        }
        return article.author.username === currentUser.username;
      })
    );
  }

  fetchData(): void {
    this.store.dispatch(GetArticleActions.getArticle({ slug: this.slug }));
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleStateSelectors.selectData))
      .subscribe((article: ArticleInterface) => (this.article = article));
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  deleteArticle(): void {
    this.store.dispatch(
      DeleteArticleActions.deleteArticle({ slug: this.slug })
    );
  }
}
