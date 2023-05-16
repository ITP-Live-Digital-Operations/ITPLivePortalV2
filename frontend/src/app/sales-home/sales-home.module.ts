import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesHomeRoutingModule } from './sales-home-routing.module';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { NewBriefComponent } from './new-sales-brief/new-brief.component';
import { ReadyBriefsComponent } from './ready-briefs/ready-briefs.component';
import { ViewBriefFilesComponent } from './view-brief-files/view-brief-files.component';
import { ViewSentBriefsComponent } from './view-sent-briefs/view-sent-briefs.component';
import { ViewSentBriefComponent } from './view-sent-brief/view-sent-brief.component';



@NgModule({
  declarations: [
    NewBriefComponent,
    SalesHomeComponent,
    ReadyBriefsComponent,
    ViewBriefFilesComponent,
    ViewSentBriefsComponent,
    ViewSentBriefComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SalesHomeRoutingModule,


  ]
})
export class SalesHomeModule { }
