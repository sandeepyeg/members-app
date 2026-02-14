import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'members', pathMatch: 'full' },

    {
        path: 'members',
        loadChildren: () =>
            import('./features/members/members.module').then(m => m.MembersModule)
    }
];
