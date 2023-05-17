import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminUserGuideComponent } from './admin-user-guide/admin-user-guide.component';
import { SalesUserGuideComponent } from './sales-user-guide/sales-user-guide.component';
import { TalentUserGuideComponent } from './talent-user-guide/talent-user-guide.component';

const routes: Routes = [

  { path: 'register-user', component: RegisterUserComponent },
  { path: 'forms', component: AdminFormsComponent},
  { path: 'user-management', component: UserManagementComponent},
  { path: 'edit-user/:id', component: EditUserComponent},
  { path: 'admin-user-guide', component: AdminUserGuideComponent},
  { path: 'sales-user-guide', component: SalesUserGuideComponent},
  { path: 'talent-user-guide', component: TalentUserGuideComponent},

  


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
