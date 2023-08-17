import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { MaterialModule } from 'src/app/common.module';
import { NewSalesBriefComponent } from './new-sales-brief/new-sales-brief.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadyBriefsComponent } from './ready-briefs/ready-briefs.component';
import { ReadyBriefsIdComponent } from './ready-briefs-id/ready-briefs-id.component';
import { SentBriefsComponent } from './sent-briefs/sent-briefs.component';
import { SentBriefsIdComponent } from './sent-briefs-id/sent-briefs-id.component';
import { BasicInformationComponent } from './new-sales-brief/basic-information/basic-information.component';
import { CampaignOverviewComponent } from './new-sales-brief/campaign-overview/campaign-overview.component';
import { InfluencerDetailsComponent } from './new-sales-brief/influencer-details/influencer-details.component';
import { AudienceDetailsComponent } from './new-sales-brief/audience-details/audience-details.component';
import { DepartmentDetailsComponent } from './new-sales-brief/department-details/department-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewBriefModule } from '../talent/view-brief/view-brief.module';

@NgModule({
  declarations: [
    NewSalesBriefComponent,
    ReadyBriefsComponent,
    ReadyBriefsIdComponent,
    SentBriefsComponent,
    SentBriefsIdComponent,
    BasicInformationComponent,
    CampaignOverviewComponent,
    InfluencerDetailsComponent,
    AudienceDetailsComponent,
    DepartmentDetailsComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ViewBriefModule
  ],
})
export class SalesModule {}
