import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ViewCampaignsComponent } from './view-campaigns/view-campaigns.component';
import { CampaignDetailsComponent } from './view-campaigns/campaign-details/campaign-details.component';
import { EditCampaignComponent} from './edit-campaign/edit-campaign.component';

let path = PATH;

const routes: Routes = [
  {
    path: 'viewCampaigns',
    component: ViewCampaignsComponent,
  },
  {
    path: 'campaignDetails/:id',
    component: CampaignDetailsComponent,
  },
  {
    path: 'newCampaign',
    component: EditCampaignComponent,
  },
  {
    path: '',
    redirectTo: `${path['forms']}`,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/site/notFound',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignRoutingModule {}
