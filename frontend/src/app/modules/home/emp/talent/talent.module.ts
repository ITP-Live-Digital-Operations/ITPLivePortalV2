import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentRoutingModule } from './talent-routing.module';
import { MaterialModule } from 'src/app/common.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfluencerLogsComponent } from './influencer-logs/influencer-logs.component';
import { PersonTasksComponent } from './person-tasks/person-tasks.component';
import { SharingModule } from '../../sharing/sharing.module';
import { InfluencerRatingComponent } from './influencer-rating/influencer-rating.component';
import { EditModule } from './edit/edit.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    InfluencerLogsComponent,
    PersonTasksComponent,
    InfluencerRatingComponent,
  ],
  imports: [
    CommonModule,
    TalentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharingModule,
    MatDialogModule,
    
  ],
})
export class TalentModule {}
