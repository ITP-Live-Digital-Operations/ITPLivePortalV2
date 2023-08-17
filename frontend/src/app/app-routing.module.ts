import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/homeComponent/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginCredentialsComponent } from './modules/login/login-credentials/login-credentials.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginCredentialsComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then(
            (m) => m.HomeModule
          ),
      }
    ]
  },
  {
    path: 'site',
    children: [
      {
        path: '',
        loadChildren: () => import('./shared/components/shared.module').then(
          (m) => m.SharedModule
        )
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
