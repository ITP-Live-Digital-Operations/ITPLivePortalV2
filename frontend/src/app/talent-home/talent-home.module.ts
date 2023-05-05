import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalentFormsComponent } from './talent-forms/talent-forms.component';
import { BriefsFromSalesComponent } from './briefs-from-sales/briefs-from-sales.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { CelebrityProfileComponent } from './celebrity-profile/celebrity-profile.component';
import { InfluencerProfileComponent } from './influencer-profile/influencer-profile.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { LogsComponent } from './logs/logs.component';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import { ModalpopupCelebrityComponent } from './modalpopup-celebrity/modalpopup-celebrity.component';
import { NewCelebrityComponent } from './new-celebrity/new-celebrity.component';
import { NewInfluencerComponent } from './new-influencer/new-influencer.component';
import { NewPackageLogComponent } from './new-package-log/new-package-log.component';
import { TasksFromTalentHeadComponent } from './tasks-from-talent-head/tasks-from-talent-head.component';
import { ViewSalesBriefComponent } from './view-sales-brief/view-sales-brief.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { TalentHomeRoutingModule } from './talent-home-routing.module';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { InfluencerRatingComponent } from './influencer-rating/influencer-rating.component';
import { StarRatingComponent } from '../partial/star-rating/star-rating.component';
import { TimeFormComponent } from './time-form/time-form.component';
import { MimeTransformPipe } from 'src/app/pipes/mime-transform.pipe';
import { AssignBriefComponent } from './assign-brief/assign-brief.component';



@NgModule({
  declarations: [
    TalentFormsComponent,
    BriefsFromSalesComponent,
    CelebritiesComponent,
    CelebrityProfileComponent,
    InfluencerProfileComponent,
    InfluencersComponent,
    LogsComponent,
    ModalpopupComponent,
    ModalpopupCelebrityComponent,
    NewCelebrityComponent,
    NewInfluencerComponent,
    NewPackageLogComponent,
    TasksFromTalentHeadComponent,
    ViewSalesBriefComponent,
    ViewTaskComponent,
    InfluencerRatingComponent,
    StarRatingComponent,
    TimeFormComponent,
    MimeTransformPipe,
    AssignBriefComponent

  ],
  imports: [
    CommonModule,
    TalentHomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class TalentHomeModule { }
