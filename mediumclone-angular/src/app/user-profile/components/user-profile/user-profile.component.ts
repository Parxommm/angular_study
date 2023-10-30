import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProfileInterface } from 'src/app/shared/types/profile.interface';
import { GetUserProfileActions } from '../../store/actions/get-user-profile.actions';
import { userProfileStateSelectors } from '../../store/selectors/user-profile.selectors';
import { authStateSelectors } from 'src/app/auth/store/selectors/auth-feature.selectors';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSubscription: Subscription;
  slug: string;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(
      select(userProfileStateSelectors.selectIsLoading)
    );
    this.error$ = this.store.pipe(
      select(userProfileStateSelectors.selectError)
    );
    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(
        select(authStateSelectors.selectCurrentUser),
        filter(Boolean)
      ),
      this.store.pipe(
        select(userProfileStateSelectors.selectData),
        filter(Boolean)
      ),
    ]).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          ProfileInterface
        ]) => {
          return currentUser.username === userProfile.username;
        }
      )
    );
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileStateSelectors.selectData))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
      });
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(
      GetUserProfileActions.getUserProfile({ slug: this.slug })
    );
  }

  getApiUrl(): string {
    const isFavorites: boolean = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
