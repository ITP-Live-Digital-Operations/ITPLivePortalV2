import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { BooleanPipe } from 'src/app/shared/pipes/boolean.pipe';
import { InfluencerNamePipe } from 'src/app/shared/pipes/influencer-name.pipe';
import { ClientsComponent } from './clients/clients.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';
import { ClientStatsComponent } from './general-statistics/client-stats/client-stats.component';
import { CampaignStatsComponent } from './general-statistics/campaign-stats/campaign-stats.component';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currencyFormat.pipe';
import { DrillDownStatsComponent } from './general-statistics/drill-down-stats/drill-down-stats.component';
import { DrillDownInfluencerStatsComponent } from './general-statistics/drill-down-stats/drill-down-influencer-stats/drill-down-influencer-stats.component';
import { InfluencerRemarksComponent } from './influencer-id/influencer-remarks/influencer-remarks.component';
import { EditInfluencerRemarksComponent } from './influencer-id/influencer-remarks/edit-influencer-remarks/edit-influencer-remarks.component';
import { InfluencerRatingComponent } from '../emp/talent/influencer-rating/influencer-rating.component';
import { TalentModule } from '../emp/talent/talent.module';
import { InfluencerStarRatingComponent } from './influencer-id/influencer-star-rating/influencer-star-rating.component';
import { YesNoPipe } from './influencer-id/table-content/yes-no.pipe';
import { TopinfluencersComponent } from './general-statistics/topinfluencers/topinfluencers.component';
import { TopInfluencersByCpmComponent } from './general-statistics/topinfluencers/top-influencers-by-cpm/top-influencers-by-cpm.component';
import { TopInfluencersByCPEComponent } from './general-statistics/topinfluencers/top-influencers-by-cpe/top-influencers-by-cpe.component';
import { TopInfluencersByMarginProfitComponent } from './general-statistics/topinfluencers/top-influencers-by-margin-profit/top-influencers-by-margin-profit.component';
import { SubmitSuggestionComponent } from './submit-suggestion/submit-suggestion.component';
import { InstagramDetailsComponent } from './influencer-id/instagram-details/instagram-details.component';
import { TiktokDetailsComponent } from './influencer-id/tiktok-details/tiktok-details.component';
import { YoutubeDetailsComponent } from './influencer-id/youtube-details/youtube-details.component';
import { ExportModashProfileComponent } from './influencer-id/export-modash-profile/export-modash-profile.component';




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
    DndDirective,
    NumberFormatPipe,
    BooleanPipe,
    InfluencerNamePipe,
    ClientsComponent,
    NewClientComponent,
    EditClientComponent,
    GeneralStatisticsComponent,
    ClientStatsComponent,
    CampaignStatsComponent,
    DrillDownStatsComponent,
    DrillDownInfluencerStatsComponent,
    InfluencerRemarksComponent,
    EditInfluencerRemarksComponent,
    InfluencerStarRatingComponent,
    YesNoPipe,
    TopinfluencersComponent,
    TopInfluencersByCpmComponent,
    TopInfluencersByCPEComponent,
    TopInfluencersByMarginProfitComponent,
    SubmitSuggestionComponent,
    InstagramDetailsComponent,
    TiktokDetailsComponent,
    YoutubeDetailsComponent,
    ExportModashProfileComponent,


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
    MatExpansionModule,
    FormsModule,
    CurrencyFormatPipe,

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
    NumberFormatPipe,
    BooleanPipe,
    InfluencerNamePipe,
    ClientsComponent,
    CurrencyFormatPipe,

  ],
})
export class SharingModule {}
