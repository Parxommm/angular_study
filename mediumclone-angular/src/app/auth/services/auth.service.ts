import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { RegisterRequestInterface } from '../types/register-request.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { environment } from 'src/environments/environment.development';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { LoginRequestInterface } from '../types/login-request.interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/current-user-input.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUserFromResponse(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUserFromResponse));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/login`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUserFromResponse));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/user`;
    return this.http.get(url).pipe(map(this.getUserFromResponse));
  }

  updateCurrentUser(
    currentUserInput: CurrentUserInputInterface
  ): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/user`;
    return this.http
      .put(url, { user: currentUserInput })
      .pipe(map(this.getUserFromResponse));
  }
}
