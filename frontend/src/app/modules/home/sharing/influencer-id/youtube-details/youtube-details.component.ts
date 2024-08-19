import { Component, Input } from '@angular/core';
import { YouTubeProfile } from 'src/app/core/interfaces/influencerAPI.model';

@Component({
  selector: 'app-youtube-details',
  templateUrl: './youtube-details.component.html',
  styleUrls: ['./youtube-details.component.scss']
})
export class YoutubeDetailsComponent {
  @Input() profile?: YouTubeProfile;
}
