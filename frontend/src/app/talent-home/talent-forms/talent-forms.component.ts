import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talent-forms',
  templateUrl: './talent-forms.component.html',
  styleUrls: ['./talent-forms.component.css']
})
export class TalentFormsComponent {
  pl: any;


  constructor(private router: Router){


  }

  ngOnInit(): void {
      this.getPrivilegeLevel();
  }

  redirectToInfluencers(){
    this.router.navigate(['home/talent/influencers'])
  }

  redirectToNewInfluencer(){
    this.router.navigate(['home/talent/newInfluencer'])
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

  redirectToNewTimeForm(){
    this.router.navigate(['home/talent/newTimeForm'])
  }

  getPrivilegeLevel(){
    var token = localStorage.getItem('token');

    // Check if the token exists and starts with "Bearer "
    if (token && token.startsWith("Bearer ")) {
      // Extract the JWT from the "Bearer" token string
      var jwt = token.substring(7);

      var parts = jwt.split('.');
      var payload = JSON.parse(atob(parts[1]));
      this.pl = payload.privilege_level;
    }

  }
}
