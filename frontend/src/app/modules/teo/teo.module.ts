import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeoRoutingModule } from './teo-routing.module';
import { TeoLoginComponent } from './teo-login/teo-login.component';


@NgModule({
  declarations: [
    TeoLoginComponent
  ],
  imports: [
    CommonModule,
    TeoRoutingModule
  ]
})
export class TeoModule { }
