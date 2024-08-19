import { Component, Input } from '@angular/core';
import { TikTokProfile } from 'src/app/core/interfaces/influencerAPI.model';

@Component({
  selector: 'app-tiktok-details',
  templateUrl: './tiktok-details.component.html',
  styleUrls: ['./tiktok-details.component.scss']
})
export class TiktokDetailsComponent {
  @Input() profile?: TikTokProfile;
}
