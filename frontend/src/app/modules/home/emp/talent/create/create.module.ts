import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { MaterialModule } from 'src/app/common.module';
import { NewInfluencerComponent } from './new-influencer/new-influencer.component';
import { GeneralInfoComponent } from './new-influencer/general-info/general-info.component';
import { SocialsComponent } from './new-influencer/socials/socials.component';
import { StatisticsComponent } from './new-influencer/statistics/statistics.component';
import { AgencyInfoComponent } from './new-influencer/agency-info/agency-info.component';
import { HttpClientModule } from '@angular/common/http';
import { NewRateLogComponent } from './rate-logs/new-rate-log/new-rate-log.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTimeFormComponent } from './new-time-form/new-time-form.component';
import { ExtraInfoComponent } from './new-influencer/extra-info/extra-info.component';
import { NewCelebrityComponent } from './new-celebrity/new-celebrity.component';
import { SingleInfluencerLogsComponent } from './rate-logs/single-influencer-logs/single-influencer-logs.component';
import { RateLogsComponent } from './rate-logs/rate-logs.component';
import { NoteLogComponent } from './rate-logs/note-log/note-log.component';

@NgModule({
  declarations: [
    NewInfluencerComponent,
    GeneralInfoComponent,
    SocialsComponent,
    StatisticsComponent,
    AgencyInfoComponent,
    NewRateLogComponent,
    NewTimeFormComponent,
    ExtraInfoComponent,
    NewCelebrityComponent,
    SingleInfluencerLogsComponent,
    RateLogsComponent,
    NoteLogComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    GeneralInfoComponent,
    SocialsComponent,
    StatisticsComponent,
    AgencyInfoComponent,
    ExtraInfoComponent,
  ],
})
export class CreateModule {}
