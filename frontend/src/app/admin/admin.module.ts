import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminUserGuideComponent } from './admin-user-guide/admin-user-guide.component';
import { SalesUserGuideComponent } from './sales-user-guide/sales-user-guide.component';
import { TalentUserGuideComponent } from './talent-user-guide/talent-user-guide.component';


@NgModule({
  declarations: [
    RegisterUserComponent,
    AdminFormsComponent,
    UserManagementComponent,
    EditUserComponent,
    AdminUserGuideComponent,
    SalesUserGuideComponent,
    TalentUserGuideComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
