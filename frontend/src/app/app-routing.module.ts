import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './modules/login/welcome.component';
import { HomeComponent } from './modules/home/homeComponent/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginCredentialsComponent } from './modules/login/login-credentials/login-credentials.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
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
