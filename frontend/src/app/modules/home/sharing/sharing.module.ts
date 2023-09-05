import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharingRoutingModule } from './sharing-routing.module';
import { AdminGuideComponent } from './userGuides/admin-guide/admin-guide.component';
import { SalesGuideComponent } from './userGuides/sales-guide/sales-guide.component';
import { TalentGuideComponent } from './userGuides/talent-guide/talent-guide.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { FormsComponent } from './forms/forms.component';
import { AllBriefsComponent } from './all-briefs/all-briefs.component';
import { InfluencerIdComponent } from './influencer-id/influencer-id.component';
import { MaterialModule } from 'src/app/common.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './influencer-id/main/main.component';
import { PlatformLinksComponent } from './influencer-id/platform-links/platform-links.component';
import { TableContentComponent } from './influencer-id/table-content/table-content.component';
import { CampaignResultsComponent } from './influencer-id/campaign-results/campaign-results.component';
import { StatisticsComponent } from './influencer-id/statistics/statistics.component';
import { LogsTableComponent } from './influencer-id/logs-table/logs-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { UserNamePipe } from 'src/app/shared/pipes/user-name.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RateCardComponent } from './influencer-id/rate-card/rate-card.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ProgressLoaderComponent } from './upload-files/progress-loader/progress-loader.component';
import { DndDirective } from './dnd.directive';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AdminGuideComponent,
    SalesGuideComponent,
    TalentGuideComponent,
    EditProfileComponent,
    InfluencersComponent,
    FormsComponent,
    EditProfileComponent,
    AllBriefsComponent,
    InfluencerIdComponent,
    MainComponent,
    PlatformLinksComponent,
    TableContentComponent,
    CampaignResultsComponent,
    StatisticsComponent,
    LogsTableComponent,
    StarRatingComponent,
    UserNamePipe,
    RateCardComponent,
    UploadFilesComponent,
    ProgressLoaderComponent,
    DndDirective
  ],
  imports: [
    CommonModule,
    SharingRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    DragDropModule,
    MatExpansionModule
  ],
  exports: [
    StarRatingComponent,
    MainComponent,
    CampaignResultsComponent,
    PlatformLinksComponent,
    StatisticsComponent,
    TableContentComponent,
    UserNamePipe,
    RateCardComponent,
    UploadFilesComponent,
  ],
})
export class SharingModule {}
