import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeGroupPipe } from 'src/app/shared/pipes/age-group.pipe';
import { UpdateActivateComponent } from './update-activate/update-activate.component';
import { SheetsBriefComponent } from './sheets-brief/sheets-brief.component';
import { MainTableComponent } from './main-table/main-table.component';
import { AllInfoComponent } from './all-info/all-info.component';
import { ViewBriefComponent } from './view-brief.component';
import { MaterialModule } from 'src/app/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewBriefRoutingModule } from './view-brief-routing.module';
import { SelectInfluencerDialogComponent } from './select-influencer-dialog/select-influencer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonInfoComponent } from './person-info/person-info.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SharingModule } from '../../../sharing/sharing.module';
import { RoundHistoryComponent } from './round-history/round-history.component';
import { TaskClientCallsTableComponent } from './sheets-brief/task-client-calls-table/task-client-calls-table.component';
import { AddInfluecersToCampaignComponent } from './add-influecers-to-campaign/add-influecers-to-campaign.component';

@NgModule({
  declarations: [
    AgeGroupPipe,
    UpdateActivateComponent,
    SheetsBriefComponent,
    MainTableComponent,
    AllInfoComponent,
    ViewBriefComponent,
    SelectInfluencerDialogComponent,
    PersonInfoComponent,
    AssignTaskComponent,
    RoundHistoryComponent,
    TaskClientCallsTableComponent,
    AddInfluecersToCampaignComponent
  ],
  imports: [
    CommonModule,
    ViewBriefRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule,
    SharingModule
  ],
  exports: [
    AllInfoComponent,
    PersonInfoComponent,
    RoundHistoryComponent
  ]
})
export class ViewBriefModule {}
