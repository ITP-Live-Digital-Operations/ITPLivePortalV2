import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditInfluencerComponent } from './edit-influencer/edit-influencer.component';
import { EditCelebrityComponent } from './edit-celebrity/edit-celebrity.component';
import { CreateModule } from '../create/create.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/common.module';


@NgModule({
  declarations: [
    EditInfluencerComponent,
    EditCelebrityComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    CreateModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MaterialModule
  ]
})
export class EditModule { }
