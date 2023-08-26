import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authStateSelectors } from 'src/app/auth/store/selectors/auth-feature.selectors';

import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(
      select(authStateSelectors.selectIsLoggedIn)
    );
    this.currentUser$ = this.store.pipe(
      select(authStateSelectors.selectCurrentUser)
    );
  }
}
