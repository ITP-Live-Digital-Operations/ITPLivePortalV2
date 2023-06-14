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
import { SalesUserGuideComponent } from './sales-user-guide/sales-user-guide.component';
import { SalesInfluencersComponent } from './sales-influencers/sales-influencers.component';
import { ViewAllSalesBriefsComponent } from './view-all-sales-briefs/view-all-sales-briefs.component';
import { UserNamePipePipe } from '../pipes/user-name-pipe.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NewBriefComponent,
    SalesHomeComponent,
    ReadyBriefsComponent,
    ViewBriefFilesComponent,
    ViewSentBriefsComponent,
    ViewSentBriefComponent,
    SalesUserGuideComponent,
    SalesInfluencersComponent,
    ViewAllSalesBriefsComponent,




  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SalesHomeRoutingModule,
    DragDropModule,
    SharedModule


  ]
})
export class SalesHomeModule { }
