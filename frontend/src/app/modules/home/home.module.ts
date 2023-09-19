import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './homeComponent/home.component';
import { MaterialModule } from 'src/app/common.module';
import { SideNavContentComponent } from './homeComponent/side-nav-content/side-nav-content.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { BackButtonComponent } from './homeComponent/back-button/back-button.component';
import { NotificationComponent } from './homeComponent/notification/notification.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [ 
    HomeComponent,
    SideNavContentComponent,
    BackButtonComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    MatDialogModule,
    MatTabsModule
  ],
})
export class HomeModule {}
