import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { MaterialModule } from 'src/app/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewBriefModule } from '../talent/view-brief/view-brief.module';
import { SharingModule } from '../../sharing/sharing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewCampaignsComponent } from './view-campaigns/view-campaigns.component';
import { CampaignDetailsComponent } from './view-campaigns/campaign-details/campaign-details.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { CampaignFilesComponent } from './view-campaigns/campaign-details/campaign-files/campaign-files.component';


@NgModule({
  declarations: [
    ViewCampaignsComponent,
    CampaignDetailsComponent,
    EditCampaignComponent,
    CampaignFilesComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ViewBriefModule,
    SharingModule,
  ]
})
export class CampaignModule { }
