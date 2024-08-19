import { Component, Input } from '@angular/core';
import { InstagramProfile } from 'src/app/core/interfaces/influencerAPI.model';

@Component({
  selector: 'app-instagram-details',
  templateUrl: './instagram-details.component.html',
  styleUrls: ['./instagram-details.component.scss']
})
export class InstagramDetailsComponent {
  @Input() profile?: InstagramProfile;
}
