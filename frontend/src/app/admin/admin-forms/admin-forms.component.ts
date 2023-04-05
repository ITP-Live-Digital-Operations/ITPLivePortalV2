import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.css']
})
export class AdminFormsComponent implements OnInit {


  constructor(private router: Router){


  }

  ngOnInit(): void {

  }

  redirectToTalent(){
      this.router.navigate(['home/talent/forms'])
  }

  redirectToSales(){
    this.router.navigate(['home/sales/forms'])
  }

  redirectToNewLog(){
    this.router.navigate(['home/talent/newLog'])
  }

  redirectToNewCelebrity(){
    this.router.navigate(['home/talent/newCelebrity'])
  }

  redirectToCelebrities(){
    this.router.navigate(['home/talent/celebrities'])
  }

  redirectToLogs(){
    this.router.navigate(['home/talent/logs'])
  }
}
