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


const routes: Routes = [
  {
    path: 'forms',
    component: FormsComponent
  },
  {
    path: 'allBriefs',
    component: AllBriefsComponent
  },
  {
    path: 'influencers',
    component: InfluencersComponent
  },
  {
    path: 'influencer/:id',
    component: InfluencerIdComponent
  },
  {
    path: 'adminGuide',
    component: AdminGuideComponent
  },
  {
    path: 'talentGuide',
    component: TalentGuideComponent
  },
  {
    path: 'salesGuide',
    component: SalesGuideComponent
  },
  {
    path: 'editProfile',
    component: EditProfileComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
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
    path: '',
    redirectTo: 'forms',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/site/notFound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharingRoutingModule { }
