import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ViewCampaignsComponent } from './view-campaigns/view-campaigns.component';

let path = PATH;

const routes: Routes = [
  {
    path: 'viewCampaigns',
    component: ViewCampaignsComponent
  },
  {
    path: '',
    redirectTo: `${path['forms']}`,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/site/notFound'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule {


}
