import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProjectsRoutingModule } from './client-projects-routing.module';
import { EafcComponent } from './eafc/eafc.component';

import { SafePipe } from '../core/pipes/safe.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';










@NgModule({
  declarations: [
    EafcComponent,
    SafePipe,

  ],
  imports: [
    CommonModule,
    ClientProjectsRoutingModule,
    SlickCarouselModule


  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: []
})
export class ClientProjectsModule { }
