import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from 'src/app/common.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { UserstatsComponent } from './userstats/userstats.component';
import { TeamSuggestionsComponent } from './team-suggestions/team-suggestions.component'


@NgModule({
  declarations: [
    UserListComponent,
    RegisterUserComponent,
    EditUserComponent,
    UserstatsComponent,
    TeamSuggestionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
