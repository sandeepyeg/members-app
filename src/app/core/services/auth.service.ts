import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface User {
    email: string;
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _user = signal<User | null>(this.getStoredUser());

    user = this._user.asReadonly();

    constructor(private router: Router) { }

    login(email: string, password: string) {

        // dummy credentials
        if (email === 'admin@company.com' && password === '123456') {

            const user: User = {
                email,
                token: 'mock-jwt-token'
            };

            localStorage.setItem('auth_user', JSON.stringify(user));
            this._user.set(user);

            return true;
        }

        return false;
    }

    logout() {
        localStorage.removeItem('auth_user');
        this._user.set(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!this._user();
    }

    getToken(): string | null {
        return this._user()?.token ?? null;
    }

    private getStoredUser(): User | null {
        const raw = localStorage.getItem('auth_user');
        return raw ? JSON.parse(raw) : null;
    }
}
