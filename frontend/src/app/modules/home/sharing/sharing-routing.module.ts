import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { AllBriefsComponent } from './all-briefs/all-briefs.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { InfluencerIdComponent } from './influencer-id/influencer-id.component';
import { AdminGuideComponent } from './userGuides/admin-guide/admin-guide.component';
import { TalentGuideComponent } from './userGuides/talent-guide/talent-guide.component';
import { SalesGuideComponent } from './userGuides/sales-guide/sales-guide.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ClientsComponent } from './clients/clients.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';
import { CampaignStatsComponent } from './general-statistics/campaign-stats/campaign-stats.component';
import { ClientStatsComponent } from './general-statistics/client-stats/client-stats.component';
import { DrillDownStatsComponent } from './general-statistics/drill-down-stats/drill-down-stats.component';
import { DrillDownInfluencerStatsComponent } from './general-statistics/drill-down-stats/drill-down-influencer-stats/drill-down-influencer-stats.component';
import { EditInfluencerComponent } from '../emp/talent/edit/edit-influencer/edit-influencer.component';
import { EditInfluencerRemarksComponent } from './influencer-id/influencer-remarks/edit-influencer-remarks/edit-influencer-remarks.component';
import { TopinfluencersComponent } from './general-statistics/topinfluencers/topinfluencers.component';
import { TopInfluencersByCpmComponent } from './general-statistics/topinfluencers/top-influencers-by-cpm/top-influencers-by-cpm.component';
import { TopInfluencersByCPEComponent } from './general-statistics/topinfluencers/top-influencers-by-cpe/top-influencers-by-cpe.component';
import { TopInfluencersByMarginProfitComponent } from './general-statistics/topinfluencers/top-influencers-by-margin-profit/top-influencers-by-margin-profit.component';
import { SubmitSuggestionComponent } from './submit-suggestion/submit-suggestion.component';

const routes: Routes = [
  {
    path: 'forms',
    component: FormsComponent,
  },
  {
    path: 'allBriefs',
    component: AllBriefsComponent,
  },
  {
    path: 'influencers',
    component: InfluencersComponent,
  },
  {
    path: 'influencer/:id',
    component: InfluencerIdComponent,
  },
  {
    path: 'adminGuide',
    component: AdminGuideComponent,
  },
  {
    path: 'talentGuide',
    component: TalentGuideComponent,
  },
  {
    path: 'salesGuide',
    component: SalesGuideComponent,
  },
  {
    path: 'editProfile',
    component: EditProfileComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'newClient',
    component: NewClientComponent,
  },
  {
    path: 'editClient/:id',
    component: EditClientComponent,
  },
  {
    path: 'generalStatistics',
    component: GeneralStatisticsComponent,
  },
  {
    path: 'campaignStatistics',
    component: CampaignStatsComponent,
  },
  {
    path: 'clientStatistics',
    component: ClientStatsComponent,
  },
  {
    path: 'viewClientStatistics/:id',
    component: DrillDownStatsComponent,
  },
  {
    path: 'viewInfluencerCampaignStatistics/:id',
    component: DrillDownInfluencerStatsComponent,
  },
  {
    path: 'editInfluencerRemark',
    component: EditInfluencerRemarksComponent,
  },
  {
    path: 'topInfluencers',
    component: TopinfluencersComponent,
  },
  {
    path: 'topbyCPM',
    component: TopInfluencersByCpmComponent,
  },
  {
    path: 'topbyCPE',
    component: TopInfluencersByCPEComponent,
  },
  {
    path: 'topByMargin',
    component: TopInfluencersByMarginProfitComponent,
  },
  {
    path: 'submit-suggestions',
    component: SubmitSuggestionComponent
  },
  {
    path: '',
    redirectTo: 'forms',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/site/notFound',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharingRoutingModule {}
