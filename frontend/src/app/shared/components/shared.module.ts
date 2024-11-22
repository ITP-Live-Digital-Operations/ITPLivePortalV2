import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from 'src/app/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoadingOverlayComponentComponent } from './loading-overlay-component/loading-overlay-component.component';



@NgModule({
  declarations: [
    ChangePasswordComponent,
    ConfirmationDialogComponent,
    LoadingOverlayComponentComponent,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoadingOverlayComponentComponent,
  ]
})
export class SharedModule { }
