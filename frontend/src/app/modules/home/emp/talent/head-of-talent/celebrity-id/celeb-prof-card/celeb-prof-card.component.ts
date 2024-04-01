import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-celeb-prof-card',
  templateUrl: './celeb-prof-card.component.html',
  styleUrls: ['./celeb-prof-card.component.scss']
})
export class CelebProfCardComponent {
  @Input()
  id!: number;

  @Input()
  profileData: any;

  @Input()
  influencerRating: any;
}
