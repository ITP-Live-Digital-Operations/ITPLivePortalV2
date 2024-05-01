
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import {
  InfluencerService,
  PaginatedInfluencers,
} from 'src/app/core/services/influencer.service';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditInfluencerComponent } from '../../emp/talent/edit/edit-influencer/edit-influencer.component';
import { InfluencerIdComponent } from '../influencer-id/influencer-id.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss'],
})
export class InfluencersComponent {
  public isLoading = true;
  public dataSource: any;
  private UserDetails: any;
  public verticals: string[] = [];
  public locations: string[] = [];
  public genders: string[] = [];
  public nationalities: string[] = [];
  public cities: string[] = [];
  public allGenders: string[] = []; // This array will be used to populate the mat-select
  public allLocations: string[] = [];
  public allCities: string[] = [];
  public allVerticals: string[] = [];
  public allNationalities: string[] = [];
  public minFollowers: number = 0; // Default minimum
  public maxFollowers: number = 50000000; // Default maximum
  public minCPE: number = 0; // Default minimum for CPE
  public maxCPE: number = 1000; // Default maximum for CPE
  public minCPM: number = 0; // Default minimum for CPM
  public maxCPM: number = 1000; // Default maximum for CPM

  public path = PATH;

  filterCriteria: any = {
    search: '',
    gender: [],
    location: [],
    vertical: [],
    nationalities: [],
    city: [],
    socialMediaPlatform: '', // Added
  };

  displayedColumns: string[] = [
    'id',
    'Name',
    'Gender',
    'InstagramFollowers',
    'TiktokFollowers',
    'YoutubeFollowers',
    'SnapchatFollowers',
    'TwitterFollowers',
    /* 'FacebookFollowers', */
    'CPE',
    'CPM',
    'marginOfProfit',
    'Action',
  ];

  public userRole = this.userService.getRole();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('socialMediaPlatformSelect') socialMediaPlatformSelect!: MatSelect;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild('genderSelect') genderSelect!: MatSelect;
  @ViewChild('locationSelect') locationSelect!: MatSelect;
  @ViewChild('citySelect') citySelect!: MatSelect;
  @ViewChild('verticalSelect') verticalSelect!: MatSelect;
  @ViewChild('nationalitySelect') nationalitySelect!: MatSelect;
  @ViewChild('searchInput') searchInputElement!: ElementRef;
  constructor(
    private influencerService: InfluencerService,
    private userService: UserService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private router: Router,
    private dialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.getInfluencers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.extractColumnData();
  }

  private extractColumnData(): void {
    const renderedData = this.table['_data'];

    for (let i = 0; i < renderedData?.length; i++) {
      const row = renderedData[i];
      this.genders.push(row.Gender);
      this.locations.push(row.CountryLocation);
      this.verticals.push(row.MainVertical);
      this.nationalities.push(row.nationalities);
    }
  }

  //Formatting and parsing for the filters

    onMinFollowersInput(value: string): void {
      this.minFollowers = this.parseFormattedNumber(value);
      this.applyFollowerRangeChange();
    }
    onMaxFollowersInput(value: string): void {
      this.maxFollowers = this.parseFormattedNumber(value);
      this.applyFollowerRangeChange();
    }
    onMinCPEInput(value: string): void {
      this.minCPE = this.parseFormattedNumber(value);
      this.applyCPECPMRangeChange();
    }

    onMaxCPEInput(value: string): void {
      this.maxCPE = this.parseFormattedNumber(value);
      this.applyCPECPMRangeChange();
    }

    onMinCPMInput(value: string): void {
      this.minCPM = this.parseFormattedNumber(value);
      this.applyCPECPMRangeChange();
    }

    onMaxCPMInput(value: string): void {
      this.maxCPM = this.parseFormattedNumber(value);
      this.applyCPECPMRangeChange();
    }
    // Utility function to parse formatted number
    parseFormattedNumber(value: string): number {
      return Number(value.replace(/,/g, ''));
    }
    // Utility methods for formatting and parsing
    formatNumber(value: number | null): string {
      return value !== null ? value.toLocaleString() : '';
    }


  applyFollowerRangeChange(): void {
    // Update the min and max followers
    this.minFollowers = this.minFollowers;
    this.maxFollowers = this.maxFollowers;

    // Apply the filter with the updated follower range
    this.applyFilter();

    // Update the dropdowns based on the filtered data
    this.updateFilterDropdowns();
  }

  applyPlatformFilter(selectedPlatform: string): void {
    // Assuming you have a filterCriteria object to store the selected platform
    this.filterCriteria.socialMediaPlatform = selectedPlatform;

    this.updateFilterDropdowns();
    this.applyFilter();
  }
  private isFollowerCountInRange(influencer: InfluencerModel): boolean {
    // If no platform is selected, consider all influencers as within the range.
    if (!this.filterCriteria.socialMediaPlatform) return true;

    const followerCountKey = `${this.filterCriteria.socialMediaPlatform}Followers` as keyof InfluencerModel;
    const followers = influencer[followerCountKey];

    // Ensure followers is a number before comparing.
    if (typeof followers === 'number') {
      return followers >= this.minFollowers && followers <= this.maxFollowers;
    }
    return false; // If followers count is not available, do not include in range.
  }

  private isCPECpmInRange(influencer: InfluencerModel): boolean {
    // Check if influencerMetrics exists before attempting to access CPE or CPM
    const metrics = influencer.influencerMetrics;
    if (!metrics) {
      // influencerMetrics is null or undefined, return false or handle accordingly
      return false;
    }

    const isCpeInRange = metrics.CPE! >= this.minCPE && metrics.CPE! <= this.maxCPE;
    const isCpmInRange = metrics.CPM! >= this.minCPM && metrics.CPM! <= this.maxCPM;

    return isCpeInRange && isCpmInRange;
  }

  applyCPECPMRangeChange(): void {
    this.applyFilter();
    this.updateFilterDropdowns();
  }

  private extractUniqueAttributes(data: InfluencerModel[], attribute: keyof InfluencerModel): string[] {
    const attributeSet = new Set<string>(
      data.map(item => {
        const value = item[attribute];
        return (typeof value === 'string' || typeof value === 'number') ? value.toString().trim() : null;
      }).filter((attr): attr is string => attr !== null && attr !== '')
    );

    let sortedAttributes = Array.from(attributeSet).sort();

    // Check if the attribute is CountryLocation or Nationality
    if (attribute === 'CountryLocation' || attribute === 'Nationality') {
      // Remove 'KSA' and 'UAE' from the list and capture them
      const specialValues = ['KSA', 'UAE'].filter(val => sortedAttributes.includes(val));

      // Remove 'KSA' and 'UAE' from sortedAttributes
      sortedAttributes = sortedAttributes.filter(val => !specialValues.includes(val));

      // Place 'KSA' and 'UAE' at the beginning of the list
      sortedAttributes = [...specialValues, ...sortedAttributes];
    }

    return sortedAttributes;
  }

  private getInfluencers(): void {
    this.isLoading = true;
    this.influencerService
      .getInfluencersWithRatings()
      .subscribe((response: any) => {
        console.log(response);
        this.UserDetails = response;
        this.allGenders = this.extractUniqueAttributes(this.UserDetails.influencers, 'Gender');
        this.allLocations = this.extractUniqueAttributes(this.UserDetails.influencers, 'CountryLocation');
        this.allCities = this.extractUniqueAttributes(this.UserDetails.influencers, 'CityLocation');
        this.allVerticals = this.extractUniqueAttributes(this.UserDetails.influencers, 'MainVertical');
        this.allNationalities = this.extractUniqueAttributes(this.UserDetails.influencers, 'Nationality');
        this.isLoading = false;



        this.dataSource = new MatTableDataSource<InfluencerModel[]>(
          this.UserDetails.influencers
        );
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item: InfluencerModel, property: string) => {
          if (property === 'CPE' || property === 'CPM' || property === 'marginOfProfit') {
            // Safely access nested properties, defaulting to a value if null
            return item.influencerMetrics ? item.influencerMetrics[property] || 0 : 0;
          }
          // Handle top-level properties
          return item[property];
        };

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.sort.active = 'Name';
          this.sort.direction = 'asc';
          this.sort.sortChange.emit({ active: this.sort.active, direction: this.sort.direction });

          this.updateFilterDropdowns();
        }, 1);
      });
  }



  private updateFilterDropdowns(): void {
    // Use a copy of the full data set as the starting point for filtering
    let baseFilteredData = [...this.dataSource.data];
    this.allGenders = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        this.isFollowerCountInRange(data) &&
        this.isCPECpmInRange(data) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.city.length || this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase())) &&
        (!this.filterCriteria.nationalities.length || this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase()))
      ), 'Gender'
    );

    // Filter for Location options based on all criteria except location itself
    this.allLocations = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        this.isFollowerCountInRange(data) &&
        this.isCPECpmInRange(data) &&
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.city.length || this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase())) &&
        (!this.filterCriteria.nationalities.length || this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase()))
      ), 'CountryLocation'
    );

    // Repeat the pattern for City, Vertical, and Nationalities filters
    this.allCities = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        this.isFollowerCountInRange(data) &&
        this.isCPECpmInRange(data) &&
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase())) &&
        (!this.filterCriteria.nationalities.length || this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase()))
      ), 'CityLocation'
    );

    this.allVerticals = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        this.isFollowerCountInRange(data) &&
        this.isCPECpmInRange(data) &&
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.city.length || this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.nationalities.length || this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase()))
      ), 'MainVertical'
    );

    this.allNationalities = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        this.isFollowerCountInRange(data) &&
        this.isCPECpmInRange(data) &&
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.city.length || this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase()))
      ), 'Nationality'
    );
  }

  public resetFilters(): void {
    // Reset filter criteria
    this.filterCriteria = {
      search: '',
      gender: [],
      location: [],
      vertical: [],
      nationalities: [],
      city: [],
      socialMediaPlatform: '',
    };
    if (this.socialMediaPlatformSelect) {
      this.socialMediaPlatformSelect.value = '';
    }
    if (this.searchInputElement && this.searchInputElement.nativeElement) {
      this.searchInputElement.nativeElement.value = '';
    }
    this.minFollowers = 0;
    this.maxFollowers = 50000000;
    this.minCPE = 0;
    this.maxCPE = 1000;
    this.minCPM = 0;
    this.maxCPM = 1000;
    this.allGenders = this.extractUniqueAttributes(this.dataSource.data, 'Gender');
    this.allLocations = this.extractUniqueAttributes(this.dataSource.data, 'CountryLocation');
    this.allCities = this.extractUniqueAttributes(this.dataSource.data, 'CityLocation');
    this.allVerticals = this.extractUniqueAttributes(this.dataSource.data, 'MainVertical');
    this.allNationalities = this.extractUniqueAttributes(this.dataSource.data, 'Nationality');
    this.resetMatSelects();
    this.applyFilter();
  }

  private resetMatSelects(): void {
    if (this.genderSelect) {
      this.genderSelect.value = [];
    }
    if (this.locationSelect) {
      this.locationSelect.value = [];
    }
    if (this.citySelect) {
      this.citySelect.value = [];
    }
    if (this.verticalSelect) {
      this.verticalSelect.value = [];
    }
    if (this.nationalitySelect) {
      this.nationalitySelect.value = [];
    }
  }


  public onPageChange(event: any): void {
    this.getInfluencers();
  }

  public applyFilter(): void {
    this.dataSource.filterPredicate = (
      data: InfluencerModel,
      filter: string
    ) => {
      const filterObject = JSON.parse(filter);

      const isMatchSearch = filterObject.search
        ? data.Name?.trim().toLowerCase().includes(filterObject.search) ||
          data.InstagramHandle?.trim().toLowerCase().includes(filterObject.search)
        : true;

      const isMatchGender = !this.filterCriteria.gender.length ||
      this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase());

      const isMatchLocation = !filterObject.location.length ||
      filterObject.location.includes(data.CountryLocation?.trim().toLowerCase());

      const isMatchCity = !this.filterCriteria.city.length ||
      this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase());

      const isMatchVertical = !this.filterCriteria.vertical.length ||
      this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase());

      const isMatchNationalities = !this.filterCriteria.nationalities.length ||
      this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase());

      // Only apply followers range filter if a social media platform is selected
      let followersInRange = true;
      if (this.filterCriteria.socialMediaPlatform) {
        const followerAttribute = `${this.filterCriteria.socialMediaPlatform}Followers` as keyof InfluencerModel;
        const followers = data[followerAttribute];

        if (typeof followers === 'number') {
          followersInRange = followers >= this.minFollowers && followers <= this.maxFollowers;
        } else {
          followersInRange = false;
        }
      }


      return (
        isMatchSearch &&
        isMatchGender &&
        isMatchLocation &&
        isMatchVertical &&
        isMatchNationalities &&
        isMatchCity &&
        followersInRange &&
        this.isCPECpmInRange(data)
      );
    };

    this.dataSource.filter = JSON.stringify(this.filterCriteria);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Update filter dropdowns based on the filtered data
    this.updateFilterDropdowns();
  }


  applyFilterChange(filterType: string, filterValue: any): void {
    switch (filterType) {
      case 'gender':
        this.filterCriteria.gender = filterValue.map((val: string) => val.trim().toLowerCase());
      break;
      case 'location':
        this.filterCriteria.location = filterValue.map((val: string) => val.trim().toLowerCase());
        break;
      case 'vertical':
        this.filterCriteria.vertical = filterValue.map((val: string) => val.trim().toLowerCase());
        break;
      case 'nationalities':
        this.filterCriteria.nationalities = filterValue.map((val: string) => val.trim().toLowerCase());
        break;
      case 'city':
        this.filterCriteria.city = filterValue.map((val: string) => val.trim().toLowerCase());
        break;
      case 'search':
        this.filterCriteria.search = filterValue.trim().toLowerCase();
        break;
      // ... add other filters as needed
      default:
        break;
    }
    if (!Array.isArray(filterValue)) {
      filterValue = [filterValue];
    }
    this.filterCriteria[filterType] = filterValue.map((val: string) => val.trim().toLowerCase());
    this.applyFilter();
    this.updateFilterDropdowns();



}

  public openLink(link: string): void {
    if (!link) {
      return;
    }
    window.open(link, '_blank');
  }

  public deleteInfluencer(inputdata: any): void {
    this.dialogService
      .openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe((result) => {
        if (result === true) {
          this.toastrService.success('Deleted Successfully!');
          this.influencerService
            .deleteInfluencer(inputdata)
            .subscribe((item) => {
              this.getInfluencers();
            });
        }
      });
  }

  public editInfluencer(inputdata: any): void {
    this.dialog?.open(EditInfluencerComponent, {
      width: '990px',
      height: '700px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }

  public viewInfluencer(inputdata: any): void {
    this.dialog?.open(InfluencerIdComponent, {
      width: '100%',
      height: '95%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }
  public redirectToNewInfluencer(): void {
    this.router.navigate([this.path['newInfluencer']]);
  }
}
