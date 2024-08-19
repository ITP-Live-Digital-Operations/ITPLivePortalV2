import { Component, Input } from '@angular/core';
import {
  InstagramAudienceDemographic,
  InstagramProfile,
} from 'src/app/core/interfaces/influencerAPI.model';
import { InfluencerService } from 'src/app/core/services/influencer.service';

interface DemographicItem {
  name: string;
  weight: number;
}

interface DemographicData {
  type: string;
  data: DemographicItem[];
}

type DemographicCategory = 'gender' | 'age' | 'country' | 'language' | 'ethnicity';

@Component({
  selector: 'app-instagram-details',
  templateUrl: './instagram-details.component.html',
  styleUrls: ['./instagram-details.component.scss'],
})
export class InstagramDetailsComponent {
  @Input() profile?: InstagramProfile;
  audienceDemographics: Record<DemographicCategory, DemographicData> = {
    gender: { type: 'gender', data: [] },
    age: { type: 'age', data: [] },
    country: { type: 'country', data: [] },
    language: { type: 'language', data: [] },
    ethnicity: { type: 'ethnicity', data: [] }
  };
  topBrands: DemographicItem[] = [];
  demographicCategories: DemographicCategory[] = ['gender', 'age', 'country', 'language', 'ethnicity'];

  fullProfile!: InstagramProfile;
  constructor(private influencerService: InfluencerService) {}

  ngOnInit(): void {
    if (this.profile) {
      console.log(this.profile.id);
      this.getProfilesWithDetails(this.profile.id);
    }
  }

  getProfilesWithDetails(id: number): void {
    this.influencerService.getInstagramProfile(id).subscribe((data) => {
      console.log(data);
      if (data) {
        this.fullProfile = data;
        console.log(this.fullProfile);
        this.processAudienceDemographics();
        this.processTopBrands();
      } else {
        console.error('No data found');
      }
    });
  }


  private processAudienceDemographics() {
    if (this.fullProfile?.InstagramAudienceDemographic) {
      this.demographicCategories.forEach(category => {
        let data: DemographicItem[] = [];

        if ( this.fullProfile.InstagramAudienceDemographic  === undefined) {
          return;
        }

        switch(category) {
          case 'gender':
            data = this.fullProfile.InstagramAudienceDemographic
              .filter(item => item.type === 'demographic' && ['MALE', 'FEMALE'].includes(item.code))
              .map(item => ({ name: item.code, weight: item.weight }));
            break;
          case 'age':
            data = this.fullProfile.InstagramAudienceDemographic
              .filter(item => item.type === 'demographic' && item.code.includes('-'))
              .map(item => ({ name: item.code, weight: item.weight }));
            break;
          case 'country':
            data = this.fullProfile.InstagramAudienceDemographic
              .filter(item => item.type === 'language' && item.name && item.name.length === 2)
              .map(item => ({ name: item.name!, weight: item.weight }));
            break;
          case 'language':
            data = this.fullProfile.InstagramAudienceDemographic
              .filter(item => item.type === 'language' && item.name && item.name.length > 2)
              .map(item => ({ name: item.name!, weight: item.weight }));
            break;
          case 'ethnicity':
            data = this.fullProfile.InstagramAudienceDemographic
              .filter(item => ['african_american', 'asian', 'white', 'hispanic'].includes(item.code))
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

  private processTopBrands() {
    if (this.fullProfile?.InstagramBrandAffinity) {
      this.topBrands = this.fullProfile.InstagramBrandAffinity
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 5)
        .map(brand => ({ name: brand.name, weight: brand.weight }));
    }
  }
}
