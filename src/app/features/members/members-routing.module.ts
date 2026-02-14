import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersPageComponent } from './pages/members-page/members-page.component';

const routes: Routes = [
  { path: '', component: MembersPageComponent },
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
