import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
    email: string;
    roles: string[];
    permissions: string[];
}

export interface LoginResponse {
    accessToken: string;
    expiresIn: number;
    user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private _user = signal<User | null>(this.getStoredUser());
    private _token = signal<string | null>(this.getStoredToken());

    user = this._user.asReadonly();

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${environment.apiUrl}/auth/login`,
            { email, password }
        ).pipe(
            tap(response => {
                // Store token and user
                localStorage.setItem('auth_token', response.accessToken);
                localStorage.setItem('auth_user', JSON.stringify(response.user));

                this._token.set(response.accessToken);
                this._user.set(response.user);
            })
        );
    }

    logout(): Observable<void> {
        const token = this.getToken();

        return this.http.post<void>(
            `${environment.apiUrl}/auth/logout`,
            {}
        ).pipe(
            finalize(() => {
                // Clear storage even if API call fails
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                this._token.set(null);
                this._user.set(null);
                this.router.navigate(['/login']);
            })
        );
    }

    getToken(): string | null {
        return this._token();
    }

    isLoggedIn(): boolean {
        return !!this._token() && !!this._user();
    }

    private getStoredUser(): User | null {
        const raw = localStorage.getItem('auth_user');
        return raw ? JSON.parse(raw) : null;
    }

    private getStoredToken(): string | null {
        return localStorage.getItem('auth_token');
    }
}
