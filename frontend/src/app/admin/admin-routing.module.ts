import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [

  { path: 'register-user', component: RegisterUserComponent },
  { path: 'forms', component: AdminFormsComponent},
  { path: 'user-management', component: UserManagementComponent},
  { path: 'edit-user/:id', component: EditUserComponent},
  
];

@NgModule({
  declarations: [],
  imports: [
            CommonModule,
            RouterModule.forChild(routes)
            ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
