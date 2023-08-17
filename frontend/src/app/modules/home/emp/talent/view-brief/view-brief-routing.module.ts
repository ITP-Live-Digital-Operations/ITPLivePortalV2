import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBriefComponent } from './view-brief.component';

const routes: Routes = [
  {
    path: '',
    component: ViewBriefComponent
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
export class ViewBriefRoutingModule { }
