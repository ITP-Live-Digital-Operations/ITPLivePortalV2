import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PATH } from 'src/app/core/constant/routes.constants';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from './view-shows/shows.component';
import { EditShowsComponent } from './edit-shows/edit-shows.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ViewShowsComponent } from './view-shows/view-shows.component';
import { AddShowComponent } from './add-show/add-show.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ProductionFormComponent } from './add-booking/production-form/production-form.component';
import { EditorFormComponent } from './add-booking/editor-form/editor-form.component';
import { GraphicsFormComponent } from './add-booking/graphics-form/graphics-form.component';

let path = PATH;

const routes : Routes = [
  {
    path : 'shows',
    component : ShowsComponent
  },
  {
    path : 'viewShows',
    component : ViewShowsComponent
  },
  {
    path : 'editShows',
    component : EditShowsComponent
  },
  {
    path : 'bookings',
    component : BookingsComponent
  },

  {
    path : 'newShow',
    component : AddShowComponent
  },
  {
    path : 'editShow',
    component : EditShowsComponent
  },
  {
    path : 'addBooking',
    component : AddBookingComponent
  },
  {
    path: 'addProductionBooking/:id',
    component: ProductionFormComponent
  },
  {
    path: 'addEditorBooking',
    component: EditorFormComponent
  },
  {
    path: 'addGraphicsBooking',
    component: GraphicsFormComponent
  },
  {
    path: '',
    redirectTo: `${path['forms']}`,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/site/notFound',
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OriginalsRoutingModule { }
