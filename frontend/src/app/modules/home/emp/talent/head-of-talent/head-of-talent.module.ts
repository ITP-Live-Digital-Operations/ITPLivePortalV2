import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadOfTalentRoutingModule } from './head-of-talent-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { MaterialModule } from 'src/app/common.module';
import { CelebritiesListComponent } from './celebrities-list/celebrities-list.component';
import { CelebrityIdComponent } from './celebrity-id/celebrity-id.component';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharingModule } from '../../../sharing/sharing.module';

@NgModule({
  declarations: [
    TaskListComponent,
    CelebritiesListComponent,
    CelebrityIdComponent,
  ],
  imports: [
    CommonModule,
    HeadOfTalentRoutingModule,
    MaterialModule,
    SharingModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class HeadOfTalentModule {}