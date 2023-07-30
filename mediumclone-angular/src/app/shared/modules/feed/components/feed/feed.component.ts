import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetFeedActions } from '../../store/actions/get-feed.actions';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from '../../types/get-feed-response.interface';
import {
  dataSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors/feed.selectors';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  data$: Observable<GetFeedResponseInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.data$ = this.store.pipe(select(dataSelector));
  }

  fetchData(): void {
    this.store.dispatch(GetFeedActions.getFeed({ url: this.apiUrlProps }));
  }
}
