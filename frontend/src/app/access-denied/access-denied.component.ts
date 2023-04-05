import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template: `
    <h4> 401 Access Denied.</h4>
    <button mat-raised-button color="primary" style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        size: 50px;
        margin-top: 5%"(click)="backButton()">Back</button>
  `,
  styles: [
   `h4{ color: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        size: 50px;
    }`
  ]
})
export class AccessDeniedComponent {
  backButton() {
    window.history.back();
    window.history.back();
  }
}
