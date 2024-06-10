import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_API_URL = environment.baseURL;

  constructor(private http: HttpClient, private router: Router) { }

  public authenticate(credentials: { email: string; password: string }) {
    const params = new HttpParams().set('email', credentials.email);
    return this.http
      .get<User[]>(`${this.BASE_API_URL}/account`, { params })
      .pipe(
        map((result) => {
          const user = result.find((account: User) =>
            account.email === credentials.email &&
            account.password === credentials.password
          );

          if (user) {
            this.setSession(user);
            return 'success';
          } else {
            return 'invalid';
          }
        })
      );
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('sessionAuthToken');
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public getUserName(): string | null {
    const userName = localStorage.getItem('sessionUserName');
    return userName ? JSON.parse(userName) : null;
  }

  private setSession(user: User): void {
    const sessionAuthToken = `user-${user.email}-${user.name}-token`;
    localStorage.setItem('sessionAuthToken', JSON.stringify(sessionAuthToken));
    localStorage.setItem('sessionUserName', JSON.stringify(user.name));
  }
}
