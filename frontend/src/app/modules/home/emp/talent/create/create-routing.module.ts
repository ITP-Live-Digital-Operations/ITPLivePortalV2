import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewInfluencerComponent } from './new-influencer/new-influencer.component';
import { NewTimeFormComponent } from './new-time-form/new-time-form.component';
import { NewRateLogComponent } from './new-rate-log/new-rate-log.component';
import { NewCelebrityComponent } from './new-celebrity/new-celebrity.component';

const routes: Routes = [
  {
    path: 'influencer',
    component: NewInfluencerComponent,
  },
  {
    path: 'rateLog',
    component: NewRateLogComponent
  },
  {
    path: 'timeForm',
    component: NewTimeFormComponent
  },
  {
    path: 'celebrity',
    component: NewCelebrityComponent
  },
  {
    path: '',
    redirectTo: '/site/notFound',
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
export class CreateRoutingModule { }
