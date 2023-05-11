import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewBriefComponent } from './new-sales-brief/new-brief.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';
import { AuthGuard } from '../core/Guards/auth.guard';
import { ReadyBriefsComponent } from './ready-briefs/ready-briefs.component';
import { ViewBriefFilesComponent } from './view-brief-files/view-brief-files.component';



const routes: Routes = [
  { path: 'forms', component: SalesHomeComponent},
  { path: 'newSalesBrief', component: NewBriefComponent},
  { path: 'readyBriefs', component: ReadyBriefsComponent},
  { path: 'view-files/:id', component: ViewBriefFilesComponent},

  { path: 'access-denied', component: AccessDeniedComponent, canActivate: [AuthGuard] }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesHomeRoutingModule { }
