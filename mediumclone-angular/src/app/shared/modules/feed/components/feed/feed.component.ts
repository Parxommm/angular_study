import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

import { GetFeedActions } from '../../store/actions/get-feed.actions';
import { Observable, Subscription } from 'rxjs';
import { GetFeedResponseInterface } from '../../types/get-feed-response.interface';
import { feedStateSelectors } from '../../store/selectors/feed.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;
  limit: number = environment.limit;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(
      select(feedStateSelectors.selectIsLoading)
    );
    this.error$ = this.store.pipe(select(feedStateSelectors.selectError));
    this.feed$ = this.store.pipe(select(feedStateSelectors.selectData));
    this.baseUrl = this.router.url.split('?')[0];
  }

  fetchData(): void {
    this.store.dispatch(GetFeedActions.getFeed({ url: this.apiUrlProps }));
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
      }
    );
  }
}
