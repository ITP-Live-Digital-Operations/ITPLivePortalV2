import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSalesBriefComponent } from './new-sales-brief/new-sales-brief.component';
import { ReadyBriefsIdComponent } from './ready-briefs-id/ready-briefs-id.component';
import { ReadyBriefsComponent } from './ready-briefs/ready-briefs.component';
import { SentBriefsComponent } from './sent-briefs/sent-briefs.component';
import { SentBriefsIdComponent } from './sent-briefs-id/sent-briefs-id.component';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ViewBriefComponent } from '../talent/view-brief/view-brief.component';

let path = PATH;

const routes: Routes = [
  {
    path: 'newBrief',
    component: NewSalesBriefComponent
  },
  {
    path: 'readyBriefs',
    component: ReadyBriefsComponent
  },
  {
    path: 'readyBriefs/:id',
    component: ReadyBriefsIdComponent
  },
  {
    path: 'sentBriefs',
    component: SentBriefsComponent
  },
  {
    path: 'sentBriefs/:id',
    component: SentBriefsIdComponent
  },
  {
    path: 'viewBrief/:id',
    component: ViewBriefComponent
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
export class SalesRoutingModule { }
