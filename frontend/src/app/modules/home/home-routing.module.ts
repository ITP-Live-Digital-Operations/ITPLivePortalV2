import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'main',
    children:[
      {
        path: '',
        loadChildren: () =>
          import('../home/sharing//sharing.module').then(
            (m) => m.SharingModule
          ),
          canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'talent',
    children:[
      {
        path: '',
        loadChildren: () =>
          import('../home/emp/talent//talent.module').then(
            (m) => m.TalentModule
          ),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          allowedRoles: ['Talent Head', 'talent', 'admin', 'superadmin']
        }
      }
    ]
  },
  {
    path: 'sales',
    children:[
      {
        path: '',
        loadChildren: () =>
          import('../home/emp/sales//sales.module').then(
            (m) => m.SalesModule
          ),
        canActivate: [AuthGuard, RoleGuard],
        data: { allowedRoles: ['Sales Head', 'sales', 'admin', 'superadmin'] },
      }
    ]
  },
  {
    path: 'admin',
    children:[
      {
        path: '',
        loadChildren: () =>
          import('../home/admin//admin.module').then(
            (m) => m.AdminModule
          ),
        canActivate: [AuthGuard, RoleGuard],
        data: { allowedRoles: ['admin', 'superadmin'] },
      }
    ]
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: '',
    redirectTo: 'main',
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
export class HomeRoutingModule { }
