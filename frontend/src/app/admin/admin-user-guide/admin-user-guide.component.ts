import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-guide',
  templateUrl: './admin-user-guide.component.html',
  styleUrls: ['./admin-user-guide.component.css']
})
export class AdminUserGuideComponent {

  constructor(private router : Router) { }

  redirectToSalesGuide() {
    this.router.navigate(['home/admin/sales-user-guide'])
  }

  redirectToTalentGuide() {
    this.router.navigate(['home/admin/talent-user-guide'])
  }


}
