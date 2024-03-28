import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-celeb-bio',
  templateUrl: './celeb-bio.component.html',
  styleUrls: ['./celeb-bio.component.scss']
})
export class CelebBioComponent {
  @Input()
  profileData: any;

 
}
