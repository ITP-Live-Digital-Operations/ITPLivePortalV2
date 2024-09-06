import { Component, Input } from '@angular/core';
import { ExportModashInfluencerProfile, ExportModashInstagramAudienceDemographic, InstagramAudienceDemographic } from 'src/app/core/interfaces/influencerAPI.model';

@Component({
  selector: 'app-export-modash-profile',
  templateUrl: './export-modash-profile.component.html',
  styleUrls: ['./export-modash-profile.component.scss']
})
export class ExportModashProfileComponent {
  @Input() profile!: ExportModashInfluencerProfile;

  constructor() { }

  ngOnInit(): void { }

  getTopCountries(): ExportModashInstagramAudienceDemographic[] {
    return this.profile.instagramProfile.InstagramAudienceDemographic
      .filter(demo => demo.type === 'country')
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 5);
  }
}
