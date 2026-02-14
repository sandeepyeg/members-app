import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/members-list/members-list.component').then(m => m.MembersListComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/member-details/member-details.component').then(m => m.MemberDetailsComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
