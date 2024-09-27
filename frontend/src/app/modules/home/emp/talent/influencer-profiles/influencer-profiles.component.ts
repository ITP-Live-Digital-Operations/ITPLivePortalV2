import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map, of, catchError } from 'rxjs';
import { InfluencerSearchProfile } from 'src/app/core/interfaces/influencersModel';
import { InfluencerService } from 'src/app/core/services/influencer.service';

@Component({
  selector: 'app-influencer-profiles',
  templateUrl: './influencer-profiles.component.html',
  styleUrls: ['./influencer-profiles.component.scss']
})
export class InfluencerProfilesComponent {
  allInfluencers: InfluencerSearchProfile[] = [];
  filteredInfluencers: Observable<InfluencerSearchProfile[]> = of([]);
  selectedInfluencers: InfluencerSearchProfile[] = [];
  searchControl = new FormControl('');
  errorMessage: string = '';

  constructor(private influencerService: InfluencerService, private router: Router) {}

  ngOnInit() {
    this.influencerService.getInfluencersSearchProfiles().pipe(
      catchError(error => {
        console.error('Error fetching influencers:', error);
        this.errorMessage = 'Failed to load influencers. Please try again later.';
        return of({ influencers: [] });
      })
    ).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.influencers)) {
          this.allInfluencers = response.influencers;
          this.initializeSearch();
        } else {
          console.error('Received invalid data:', response);
          this.errorMessage = 'Received invalid data from the server.';
          this.allInfluencers = [];
        }
      }
    );
  }

  initializeSearch() {
    this.filteredInfluencers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): InfluencerSearchProfile[] {
    const filterValue = value.toLowerCase();
    return this.allInfluencers.filter(influencer =>
      influencer && influencer.Name && influencer.Name.toLowerCase().includes(filterValue)
    );
  }

  isSelected(influencer: InfluencerSearchProfile): boolean {
    return this.selectedInfluencers.some(selected => selected.id === influencer.id);
  }

  toggleSelection(influencer: InfluencerSearchProfile) {
    const index = this.selectedInfluencers.findIndex(selected => selected.id === influencer.id);
    if (index > -1) {
      this.selectedInfluencers.splice(index, 1);
    } else {
      this.selectedInfluencers.push(influencer);
    }
  }

  removeInfluencer(influencer: InfluencerSearchProfile) {
    const index = this.selectedInfluencers.findIndex(selected => selected.id === influencer.id);
    if (index > -1) {
      this.selectedInfluencers.splice(index, 1);
    }
  }

  onNext() {
    if (this.selectedInfluencers.length > 0) {
      const selectedIds = this.selectedInfluencers.map(influencer => influencer.id);
      this.router.navigate(['/next-component'], { state: { selectedIds } });
    }
  }
}
