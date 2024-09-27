import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonTasksComponent } from './person-tasks/person-tasks.component';
import { InfluencerRatingComponent } from './influencer-rating/influencer-rating.component';
import { InfluencerLogsComponent } from './influencer-logs/influencer-logs.component';
import { PATH } from 'src/app/core/constant/routes.constants';
import { InfluencerProfilesComponent } from './influencer-profiles/influencer-profiles.component';

let path = PATH;

const routes: Routes = [
  {
    path: 'viewBrief/:id',
    children:[
      {
        path: '',
        loadChildren: () =>
          import('../talent/view-brief/view-brief.module').then(
            (m) => m.ViewBriefModule
          )
      }
    ]
  },
  {
    path: 'edit',
    children:[
      {
        path: '',
        loadChildren: () =>
          import('../talent/edit/edit.module').then(
            (m) => m.EditModule
          )
      }
    ]
  },
  {
    path: 'tasks/:id', //   personal / executive    tasks
    component: PersonTasksComponent
  },
  {
    path: 'logs',
    component: InfluencerLogsComponent
  },
  {
    path: 'influencerRating/:id',
    component: InfluencerRatingComponent
  },
  {
    path: 'influencerProfiles',
    component: InfluencerProfilesComponent
  },
  {
    path: 'new',
    children:[
      {
        path: '',
        loadChildren: () =>
          import('../talent/create/create.module').then(
            (m) => m.CreateModule
          )
      }
    ]
  },
  {
    path: 'head',
    children:[
      {
        path: '',
        loadChildren: () =>
          import('../talent/head-of-talent/head-of-talent.module').then(
            (m) => m.HeadOfTalentModule
          )
      }
    ]
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
export class TalentRoutingModule { }
