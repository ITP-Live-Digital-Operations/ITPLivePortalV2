import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OriginalsRoutingModule } from '../originals/originals-routing.module';
import { ShowsComponent } from './view-shows/shows.component';
import { EditShowsComponent } from './edit-shows/edit-shows.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ViewShowsComponent } from './view-shows/view-shows.component';
import { MaterialModule } from 'src/app/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewBriefModule } from '../talent/view-brief/view-brief.module';
import { SharingModule } from '../../sharing/sharing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { AddShowComponent } from './add-show/add-show.component';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    ShowsComponent,
    EditShowsComponent,
    BookingsComponent,
    ViewShowsComponent,
    AddShowComponent
  ],
  imports: [
    CommonModule,
    OriginalsRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ]
})
export class OriginalsModule { }
