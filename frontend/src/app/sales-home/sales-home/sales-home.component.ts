import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.css']
})
export class SalesHomeComponent {
  pl: any;


  constructor(private router: Router){ }


  redirectToSalesBrief(){
    this.router.navigate(['home/sales/newSalesBrief'])
  }
}
