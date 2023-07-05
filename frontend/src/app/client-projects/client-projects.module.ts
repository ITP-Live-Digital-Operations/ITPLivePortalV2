import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProjectsRoutingModule } from './client-projects-routing.module';
import { EafcComponent } from './eafc/eafc.component';

import { SafePipe } from '../core/pipes/safe.pipe';

import { CarouselModule } from 'ngx-owl-carousel-o';








@NgModule({
  declarations: [
    EafcComponent,
    SafePipe,

  ],
  imports: [
    CommonModule,
    ClientProjectsRoutingModule,
    CarouselModule,

  ],
  exports: []
})
export class ClientProjectsModule { }
