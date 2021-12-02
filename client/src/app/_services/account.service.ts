import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = environment.apiUrl;
  private currentUserObserveable = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserObserveable.asObservable();

  constructor(private http: HttpClient) {}

  login(model: User) {
    return this.http.post<User>(`${this.baseUrl}/Account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserObserveable.next(user);
        }
        return user;
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(`${this.baseUrl}/Account/register`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User | undefined) {
    this.currentUserObserveable.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserObserveable.next(undefined);
  }
}
