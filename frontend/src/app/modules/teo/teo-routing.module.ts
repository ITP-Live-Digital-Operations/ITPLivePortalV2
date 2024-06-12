import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeoLoginComponent } from './teo-login/teo-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: TeoLoginComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeoRoutingModule { }
