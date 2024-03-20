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
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { BasicInfoComponent } from './celebrity-id/basic-info/basic-info.component';
import { CelebrityRemarksComponent } from './celebrity-id/celebrity-remarks/celebrity-remarks.component';
import { EditCelebrityRemarkComponent } from './celebrity-id/celebrity-remarks/edit-celebrity-remark/edit-celebrity-remark.component';
import { AddCelebrityRemarkComponent } from './celebrity-id/celebrity-remarks/add-celebrity-remark/add-celebrity-remark.component';

@NgModule({
  declarations: [
    TaskListComponent,
    CelebritiesListComponent,
    CelebrityIdComponent,
    BasicInfoComponent,
    CelebrityRemarksComponent,
    EditCelebrityRemarkComponent,
    AddCelebrityRemarkComponent,
  ],
  imports: [
    CommonModule,
    HeadOfTalentRoutingModule,
    MaterialModule,
    SharedModule,
    SharingModule,
    MatExpansionModule,
    MatSliderModule,
    ReactiveFormsModule
  ],
})
export class HeadOfTalentModule {}
