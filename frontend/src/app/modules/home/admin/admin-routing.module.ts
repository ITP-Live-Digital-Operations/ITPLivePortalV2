import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { PATH } from 'src/app/core/constant/routes.constants';

let path = PATH;

const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditUserComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: '',
    redirectTo: `${path['forms']}`,
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
export class AdminRoutingModule { }
