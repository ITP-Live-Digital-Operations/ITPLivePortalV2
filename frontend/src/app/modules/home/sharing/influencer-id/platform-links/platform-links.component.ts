import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-platform-links',
  templateUrl: './platform-links.component.html',
  styleUrls: ['./platform-links.component.scss']
})
export class PlatformLinksComponent {

  @Input() 
  profileData: any;

} 
