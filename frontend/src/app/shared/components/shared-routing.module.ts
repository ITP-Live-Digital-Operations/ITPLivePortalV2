import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: 'accessDenied',
    component: AccessDeniedComponent
  },
  {
    path: 'notFound',
    component: NotFoundComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: '',
    redirectTo: "/site/notFound",
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/site/notFound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
