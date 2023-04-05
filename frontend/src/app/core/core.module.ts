import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxHttpRequestModule } from 'ngx-http-request-cache';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    NgxHttpRequestModule.forRoot(),
  ]
})
export class CoreModule { }
