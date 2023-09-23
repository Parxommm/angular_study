import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetPopularTagsActions } from '../store/actions/get-popular-tags.actions';
import { Observable } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/popular-tag.type';
import { PopularTagsStateSelectors } from '../store/selectors/popular-tags.selectors';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  popularTags$: Observable<PopularTagType[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.popularTags$ = this.store.pipe(
      select(PopularTagsStateSelectors.selectData)
    );
    this.isLoading$ = this.store.pipe(
      select(PopularTagsStateSelectors.selectIsLoading)
    );
    this.error$ = this.store.pipe(
      select(PopularTagsStateSelectors.selectError)
    );
  }

  fetchData(): void {
    this.store.dispatch(GetPopularTagsActions.getPopularTags());
  }
}
