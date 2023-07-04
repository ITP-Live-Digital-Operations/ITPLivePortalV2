import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxHttpRequestModule } from 'ngx-http-request-cache';
import { SafePipe } from './pipes/safe.pipe';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgxHttpRequestModule.forRoot(),
  ]
})
export class CoreModule { }
