import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  accessToken: string;
  expiresIn?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'bank_token';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<LoginResponse> {
    console.log('🔵 login() called with', username, password);
    const url = `${environment.apiBaseUrl}/users?username=${username}&password=${password}`;
    console.log('🌐 Fetching:', url);

    return this.http.get<any[]>(url).pipe(
      tap({
        next: users => console.log('✅ API response:', users),
        error: err => console.error('❌ API error:', err)
      }),
      map(users => {
        if (users.length) {
          const user = users[0];
          console.log('💾 storing token:', user.accessToken);
          localStorage.setItem(this.tokenKey, user.accessToken);
          this._isLoggedIn$.next(true);
          return { accessToken: user.accessToken };
        }
        console.error('⚠️ Invalid credentials');
        throw new Error('Invalid credentials');
      })
    );
  }


  logout(redirect = true) {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn$.next(false);

    if (redirect) {
      console.log('🚪 Redirecting to login...');
      this.router.navigate(['/auth/login']);
    }
  }


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getDecodedToken(): any | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      return jwtDecode(t);
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded || !decoded.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  }

}
