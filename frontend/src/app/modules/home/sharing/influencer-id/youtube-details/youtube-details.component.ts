import { Component, Input, OnInit } from '@angular/core';
import { YouTubeProfile } from 'src/app/core/interfaces/influencerAPI.model';
import { InfluencerService } from 'src/app/core/services/influencer.service';

interface DemographicItem {
  name: string;
  weight: number;
}

interface DemographicData {
  type: string;
  data: DemographicItem[];
}

type DemographicCategory = 'gender' | 'age' | 'country';

@Component({
  selector: 'app-youtube-details',
  templateUrl: './youtube-details.component.html',
  styleUrls: ['./youtube-details.component.scss']
})
export class YoutubeDetailsComponent implements OnInit {
  @Input() profile?: YouTubeProfile;
  fullProfile!: YouTubeProfile;
  audienceDemographics: Record<DemographicCategory, DemographicData> = {
    gender: { type: 'gender', data: [] },
    age: { type: 'age', data: [] },
    country: { type: 'country', data: [] }
  };
  topCategories: DemographicItem[] = [];
  demographicCategories: DemographicCategory[] = ['gender', 'age', 'country'];

  constructor(private influencerService: InfluencerService) {}

  ngOnInit(): void {
    if (this.profile) {
      this.getProfileWithDetails(this.profile.id);
    }
  }

  getProfileWithDetails(id: number): void {
    this.influencerService.getYouTubeProfile(id).subscribe((data) => {
      if (data) {
        this.fullProfile = data;
        this.processAudienceDemographics();
      } else {
        console.error('No data found');
      }
    });
  }

  private processAudienceDemographics() {
    if (this.fullProfile?.YouTubeAudienceDemographic) {
      this.demographicCategories.forEach(category => {
        let data: DemographicItem[] = [];

        if (this.fullProfile.YouTubeAudienceDemographic === undefined) {
          return;
        }

        switch (category) {
          case 'gender':
            data = this.fullProfile.YouTubeAudienceDemographic
              .filter(item => item.type === 'gender' && ['MALE', 'FEMALE'].includes(item.code))
              .map(item => ({ name: item.code, weight: item.weight }));
            break;
          case 'age':
            data = this.fullProfile.YouTubeAudienceDemographic
              .filter(item => item.type === 'age')
              .map(item => ({ name: item.code, weight: item.weight }));
            break;
          case 'country':
            data = this.fullProfile.YouTubeAudienceDemographic
              .filter(item => item.type === 'country')
              .map(item => ({ name: item.name || item.code, weight: item.weight }));
            break;
        }

        this.audienceDemographics[category] = {
          type: category,
          data: data.sort((a, b) => b.weight - a.weight).slice(0, 3)
        };
      });
    }
  }

  toggleYoutube() {
    window.open('https://www.youtube.com/@' + this.profile?.username, '_blank');
  }

}
