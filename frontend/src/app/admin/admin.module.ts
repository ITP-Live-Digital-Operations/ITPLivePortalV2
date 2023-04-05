import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';


@NgModule({
  declarations: [
    RegisterUserComponent,
    AdminFormsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
