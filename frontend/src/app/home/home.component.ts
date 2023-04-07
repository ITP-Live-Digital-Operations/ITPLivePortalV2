import { ChangeDetectorRef, Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { BreakpointObserver } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { SalesService } from '../core/Services/sales.service';
import { TaskService } from '../core/Services/task.service';
import { Location } from '@angular/common';
import { DataService } from '../core/Services/data.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parts: any;
  payload: any;
  userID: any;
  userName: any;
  userRole: any;
  userPrivilege_level: any;
  token: any;

  menu: any;
  msg: any;
  talentHeadNotificationCount: any;
  talentEmployeeNotificationCount: any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router, private salesService: SalesService,
     private taskService: TaskService, private location: Location,  private cdr: ChangeDetectorRef, private dataService : DataService, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    // Check if the token exists and starts with "Bearer "
    if (this.token && this.token.startsWith("Bearer ")) {
      // Extract the JWT from the "Bearer" token string
      var jwt = this.token.substring(7);

      this.parts = jwt.split('.');
      this.payload = JSON.parse(atob(this.parts[1]));
      this.userID = parseInt(this.payload.id);
      this.userName = this.payload.name;
      this.userRole = this.payload.role;
      this.userPrivilege_level = this.payload.privilege_level;
    }

    const load =  this.userID


    if (this.userRole == 'talent') {
      if (this.userPrivilege_level > 7) {
        this.salesService.getSalesBriefsNotViewedByTalent().subscribe(item => {
          this.ngZone.run(() => {
            this.talentHeadNotificationCount = item;
            this.cdr.detectChanges();
          });
        })
      }
      else {
        this.taskService.getUnfinishedTasks(load).subscribe(item => {
          this.ngZone.run(() => {
            this.talentEmployeeNotificationCount = item;
            this.cdr.detectChanges();
          });
        })
      }
    }
    this.refresh();
  }

  redirectToTalentForms() {
    this.router.navigate(['home/talent/forms'])
  }

  redirectToSalesForms() {
    this.router.navigate(['home/sales/forms'])
  }

  refresh(): void {
    const refreshFlag = localStorage.getItem('refreshed');

      if (!refreshFlag) {
      localStorage.setItem('refreshed', 'true');
      this.location.go(this.location.path());
      window.location.reload();
    }
  }

  exportSeeds(){
      this.dataService.exportSeeds().subscribe((res) => {
        this.msg = res

        if( this.msg.message == 'Script executed successfully!'){
          alertify.success('Seeds exported successfully!');
        }
        else{
          alertify.error('Seeds export failed!');
        }
      })
  }
}




