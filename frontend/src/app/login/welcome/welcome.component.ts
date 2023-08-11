import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {


  ngOnInit(): void {
    localStorage.clear();
  }
  
  ngAfterViewInit() {
    const videoElement = document.querySelector('video');
    videoElement?.play();
}
}
