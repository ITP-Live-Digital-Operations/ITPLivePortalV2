import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss'],
})
export class InfluencersComponent {

  public dataSource: any;
  private UserDetails: any;
  public verticals: string[] = [];
  public locations: string[] = [];
  public genders: string[] = [];
  public nationalities: string[] = [];
  public cities: string[] = [];

  platforms: any[] = [
    'Instagram',
    'Tiktok',
    'Snapchat',
    'Twitter',
    'Facebook',
    'Youtube',
  ];

  filterCriteria: any = {
    search: '',
    gender: '',
    location: '',
    vertical: '',
    nationalities: '',
  };

  displayedColumns: string[] = [
    'ID',
    'Name',
    'Gender',
    'InstagramHandle',
    'InstagramFollowers',
    'CountryLocation',
    'MainVertical',
    'itpAverageRating',
    'Action',
  ];

  public platform: string = 'Instagram';

  public userRole = this.userService.getRole();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private influencerService: InfluencerService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getInfluencers();
    this.getGenders();
    this.getLocations();
    this.getVerticals();
    this.getNationalities();
    this.getCities();
  }

  ngAfterViewInit() {
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort;
    }
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

  private getGenders(): void {
    this.influencerService.getGenders().subscribe((response: any) => {
      this.genders = response
        .map((obj: { genders: any }) => obj.genders)
        .filter((str: string) => str !== '')
        .sort();
    });
  }

  private getLocations(): void {
    this.influencerService.getLocations().subscribe((response: any) => {
      this.locations = response
        .map((obj: { locations: any }) => obj.locations)
        .filter((str: string) => str !== '')
        .sort();
    });
  }

  private getVerticals(): void {
    this.influencerService.getVerticals().subscribe((response: any) => {
      this.verticals = response
        .map((obj: { verticals: any }) => obj.verticals)
        .filter((str: string) => str !== '')
        .sort();
    });
  }

  private getNationalities(): void {
    this.influencerService.getNationalities().subscribe((response: any) => {
      this.nationalities = response
        .map((obj: { nationalities: any }) => obj.nationalities)
        .filter((str: string) => str !== '')
        .sort();
    });
  }

  private getCities(): void {
    this.influencerService.getCities().subscribe((response: any) => {
      this.cities = response
        .map((obj: { cities: any }) => obj.cities)
        .filter((str: string) => str && str !== '')
        .sort();
    });
  }

  private getInfluencers(): void {
    this.influencerService
      .getInfluencersWithRatings()
      .subscribe((response: PaginatedInfluencers) => {
        this.UserDetails = response;
        this.dataSource = new MatTableDataSource<InfluencerModel>(
          this.UserDetails.influencers
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.updateFilterDropdowns();
        }, 0);
      });
  }

  private updateFilterDropdowns(): void {
    const renderedData = this.dataSource.filteredData || [];

    this.genders = [
      ...new Set(renderedData.map((row: { Gender: any }) => row.Gender)),
    ].sort() as string[];
    this.locations = [
      ...new Set(
        renderedData.map((row: { CountryLocation: any }) => row.CountryLocation)
      ),
    ].sort() as string[];
    this.verticals = [
      ...new Set(
        renderedData.map((row: { MainVertical: any }) => row.MainVertical)
      ),
    ].sort()  as string[];
    this.nationalities = [
      ...new Set(
        renderedData.map((row: { Nationality: any }) => row.Nationality)
      ),
    ].sort()  as string[];
    // ... Add other filters as needed
  }

  public onPageChange(event: any): void {
    this.getInfluencers();
  }

  public applyFilterSearch(filterValue: string): void {
    this.filterCriteria.search = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  public deleteInfluencer(inputdata: any): void {
    this.influencerService.deleteInfluencer(inputdata).subscribe((item) => {
      this.getInfluencers();
    });
  }

  public editInfluencer(inputdata: any): void {
    this.dialog?.open(EditInfluencerComponent, {
      width: '90%',
      height: '80%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }

  public viewInfluencer(inputdata: any): void {
    this.dialog?.open(InfluencerIdComponent, {
      width: '90%',
      height: '80%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }
  
  public applyFilter(): void {
    this.dataSource.filterPredicate = (
      data: InfluencerModel,
      filter: string
    ) => {
      const isMatchSearch = this.filterCriteria.search
        ? data.Name.trim().toLowerCase().includes(this.filterCriteria.search)
        : true;

      return (
        isMatchSearch &&
        (!this.filterCriteria.gender ||
          data.Gender.trim().toLowerCase() === this.filterCriteria.gender) &&
        (!this.filterCriteria.location ||
          data.CountryLocation.trim().toLowerCase() ===
            this.filterCriteria.location) &&
        (!this.filterCriteria.vertical ||
          data.MainVertical.trim().toLowerCase() ===
            this.filterCriteria.vertical) &&
        (!this.filterCriteria.nationalities ||
          data.Nationality.trim().toLowerCase() ===
            this.filterCriteria.nationalities) &&
        (!this.filterCriteria.city ||
          (data.CityLocation &&
            data.CityLocation.trim().toLowerCase() ===
              this.filterCriteria.city))
      );
    };

    this.dataSource.filter = JSON.stringify(this.filterCriteria);

    this.updateFilterDropdowns();
  }

  public applyFilter1(filterValue: string): void {
    this.filterCriteria.gender = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  public applyFilter2(filterValue: string): void {
    this.filterCriteria.location = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  public applyFilter3(filterValue: string): void {
    this.filterCriteria.vertical = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  public applyFilter4(filterValue: string): void {
    this.filterCriteria.nationalities = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  public applyFilter5(filterValue: string): void {
    this.filterCriteria.city = filterValue.trim().toLowerCase();
    this.applyFilter();
  }
  
  public applyPlatformFilter(platform: string): void {
    this.platform = platform;

    const baseColumns = ['ID', 'Name', 'Gender', 'CountryLocation'];

    let platformColumns = [];

    switch (platform) {
      case 'Instagram':
        platformColumns = [
          'InstagramHandle',
          'InstagramFollowers',
          'MainVertical',
          'itpAverageRating',
          'Action',
        ];
        break;
      case 'Tiktok':
        platformColumns = [
          'TiktokHandle',
          'TiktokFollowers',
          'MainVertical',
          'itpAverageRating',
          'Action',
        ];
        break;
      case 'Snapchat':
        platformColumns = [
          'SnapchatHandle',
          'SnapchatFollowers',
          'MainVertical',
          'itpAverageRating',
          'Action',
        ];
        break;
      case 'Twitter':
        platformColumns = [
          'TwitterHandle',
          'TwitterFollowers',
          'MainVertical',
          'itpAverageRating',
          'Action',
        ];
        break;
      case 'Facebook':
        platformColumns = [
          'FacebookHandle',
          'FacebookFollowers',
          'MainVertical',
          'itpAverageRating',
          'Action',
        ];
        break;
      case 'Youtube':
        platformColumns = [
          'YoutubeHandle',
          'YoutubeFollowers',
          'MainVertical',
          'itpAverageRating',
          'Action',
        ];
        break;
      default:
        platformColumns = [
          'InstagramHandle',
          'InstagramFollowers',
          'MainVertical',
          'itpAverageRating',
          'Action',
        ];
        break;
    }

    this.displayedColumns = [...baseColumns, ...platformColumns];
  }
}
