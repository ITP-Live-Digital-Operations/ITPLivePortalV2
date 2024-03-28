import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OriginalsRoutingModule } from '../originals/originals-routing.module';
import { ShowsComponent } from './view-shows/shows.component';
import { EditShowsComponent } from './edit-shows/edit-shows.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ViewShowsComponent } from './view-shows/view-shows.component';
import { MaterialModule } from 'src/app/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { AddShowComponent } from './add-show/add-show.component';
import { MatIconModule } from '@angular/material/icon';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ProductionFormComponent } from './add-booking/production-form/production-form.component';
import { EditorFormComponent } from './add-booking/editor-form/editor-form.component';
import { GraphicsFormComponent } from './add-booking/graphics-form/graphics-form.component';
import { ProductionTeamMembersFormComponent } from './add-booking/production-form/production-team-members-form/production-team-members-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {MatExpansionModule} from '@angular/material/expansion';





@NgModule({
  declarations: [
    ShowsComponent,
    EditShowsComponent,
    BookingsComponent,
    ViewShowsComponent,
    AddShowComponent,
    AddBookingComponent,
    ProductionFormComponent,
    EditorFormComponent,
    GraphicsFormComponent,
    ProductionTeamMembersFormComponent,

  ],
  imports: [
    CommonModule,
    OriginalsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,MatExpansionModule,MatDatepickerModule,MatNativeDateModule,MatSortModule,MatPaginatorModule,MatTableModule,
  ]
})
export class OriginalsModule { }
