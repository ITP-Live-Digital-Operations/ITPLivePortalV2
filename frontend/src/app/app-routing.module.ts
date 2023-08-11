import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/Guards/auth.guard';
import { RoleGuard } from './core/Guards/role.guard';

import { HomeComponent } from './home/home.component';
import { StatusComponent } from './status/status.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { EafcComponent } from './client-projects/eafc/eafc.component';
import { WelcomeComponent } from './login/welcome/welcome.component';

const routes: Routes = [


  { path: 'login', component: LoginPageComponent },

  { path: 'welcome', component: WelcomeComponent},

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'talent',
        loadChildren: () =>
          import('./talent-home/talent-home.module').then(
            (m) => m.TalentHomeModule
          ),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          allowedRoles: ['Talent Head', 'talent', 'admin', 'superadmin'],
        },
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./sales-home/sales-home.module').then(
            (m) => m.SalesHomeModule
          ),
        canActivate: [AuthGuard, RoleGuard],
        data: { allowedRoles: ['Sales Head', 'sales', 'admin', 'superadmin'] },
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { allowedRoles: ['admin', 'superadmin'] },
      },
    ],
  },
  {
    path: 'EAFC',
    component: EafcComponent,
  },
  {
    path: 'eafc',
    redirectTo: 'EAFC',
    pathMatch: 'full',
  },

  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '**', component: StatusComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
