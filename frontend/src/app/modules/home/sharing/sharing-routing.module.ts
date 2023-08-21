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