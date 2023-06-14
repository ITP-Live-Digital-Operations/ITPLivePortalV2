import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNamePipePipe } from '../pipes/user-name-pipe.pipe';


@NgModule({
  declarations: [
    UserNamePipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserNamePipePipe
  ]
})
export class SharedModule { }
