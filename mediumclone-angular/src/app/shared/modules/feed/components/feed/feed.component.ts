import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import queryString from 'query-string';

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
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
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
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !==
        changes['apiUrlProps'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(
      select(feedStateSelectors.selectIsLoading)
    );
    this.error$ = this.store.pipe(select(feedStateSelectors.selectError));
    this.feed$ = this.store.pipe(select(feedStateSelectors.selectData));
    this.baseUrl = this.router.url.split('?')[0];
  }

  fetchFeed(): void {
    const offset: number = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams: string = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(GetFeedActions.getFeed({ url: apiUrlWithParams }));
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      }
    );
  }
}
