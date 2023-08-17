import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditInfluencerComponent } from './edit-influencer/edit-influencer.component';
import { EditCelebrityComponent } from './edit-celebrity/edit-celebrity.component';

const routes: Routes = [
  {
    path: 'influencer',
    component: EditInfluencerComponent,
  },
  {
    path: 'celebrity',
    component: EditCelebrityComponent
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
export class EditRoutingModule { }
