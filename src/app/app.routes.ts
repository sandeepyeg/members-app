import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'members',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./features/members/members.module').then(m => m.MembersModule)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login.component')
                .then(m => m.LoginComponent)
    }
];
