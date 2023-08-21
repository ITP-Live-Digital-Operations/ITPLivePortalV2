import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {

    ngAfterViewInit() {
      const videoElement = document.querySelector('video');
      videoElement?.play();
  }

}
