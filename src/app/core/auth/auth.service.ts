import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  role: string; // "ADMIN" o "USER"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = signal(false);  
  private apiUrl = 'https://portfolio-spring-1-jhxz.onrender.com/api/auth';
  private accessToken: string | null = null;
  private loggedIn$ = new BehaviorSubject<boolean>(this.hasValidToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => this.handleTokens(res)),
      tap(() => this.loggedIn$.next(true))
    );
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return throwError(() => new Error('No refresh token'));

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(res => this.handleTokens(res)),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  private handleTokens(res: AuthResponse): void {
    this.accessToken = res.accessToken;
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    if (res.role) {
      this.isAdmin.set(res.role === 'ADMIN');
    } else {
      // Si el rol viene en el JWT, decóda aquí
      this.isAdmin.set(this.decodeIsAdmin(res.accessToken));
    }
  }

  private decodeIsAdmin(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'ADMIN';
    } catch {
      return false;
    }
  }

logout(): void {
  this.accessToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  this.loggedIn$.next(false);
  this.isAdmin.set(false);
  this.router.navigate(['/login']);
}


  isLoggedIn(): boolean {
    return this.loggedIn$.value;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');
        return !!token;
    }

  private hasValidToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
