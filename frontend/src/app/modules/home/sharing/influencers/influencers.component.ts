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
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';

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
  public allGenders: string[] = []; // This array will be used to populate the mat-select
  public allLocations: string[] = [];
  public allCities: string[] = [];
  public allVerticals: string[] = [];
  public allNationalities: string[] = [];

  filterCriteria: any = {
    search: '',
    gender: [],
    location: [],
    vertical: [],
    nationalities: [],
    city: [],
  };

  displayedColumns: string[] = [
    'Name',
    'Gender',
    'InstagramFollowers',
    'TiktokFollowers',
    'YoutubeFollowers',
    'SnapchatFollowers',
    'TwitterFollowers',
    'FacebookFollowers',
    'CPE',
    'CPM',
    'marginOfProfit',
    'Action',
  ];

  public userRole = this.userService.getRole();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private influencerService: InfluencerService,
    private userService: UserService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private dialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.getInfluencers();
  }

  ngAfterViewInit() {
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

  private getInfluencers(): void {
    this.influencerService
      .getInfluencersWithRatings()
      .subscribe((response: PaginatedInfluencers) => {
        console.log(response);
        this.UserDetails = response;
        this.allGenders = this.extractUniqueAttributes(this.UserDetails.influencers, 'Gender');
        this.allLocations = this.extractUniqueAttributes(this.UserDetails.influencers, 'CountryLocation');
        this.allCities = this.extractUniqueAttributes(this.UserDetails.influencers, 'CityLocation');
        this.allVerticals = this.extractUniqueAttributes(this.UserDetails.influencers, 'MainVertical');
        this.allNationalities = this.extractUniqueAttributes(this.UserDetails.influencers, 'Nationality');
   

        this.dataSource = new MatTableDataSource<InfluencerModel[]>(
          this.UserDetails.influencers
        );
        this.dataSource.sortingDataAccessor = (item: any, property: any) => {
          switch (property) {
            case 'CPE':
              let value = item.influencerMetrics.CPE;
              if (value === null || value === '') {
                return 1000000;
              } else {
                return item.influencerMetrics.CPE;
              }
            case 'CPM':
              let value1 = item.influencerMetrics.CPM;
              if (value1 === null || value1 === '') {
                return 10000000;
              } else {
                return item.influencerMetrics.CPM;
              }
            case 'marginOfProfit':
              return item.influencerMetrics.marginOfProfit;
            default:
              return item[property];
          }
        };
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.updateFilterDropdowns();
        }, 1);
      });
  }

  private extractUniqueAttributes(data: InfluencerModel[], attribute: keyof InfluencerModel): string[] {
    const attributeSet = new Set<string>(
      data.map(item => {
        const value = item[attribute];
        return (typeof value === 'string' || typeof value === 'number') ? value.toString().trim() : null;
      }).filter((attr): attr is string => attr !== null && attr !== '')
    );
    return Array.from(attributeSet).sort();
  }

  private updateFilterDropdowns(): void {
    // Use a copy of the full data set as the starting point for filtering
    let baseFilteredData = [...this.dataSource.data];
  
    // Dynamically update options for each filter based on current filterCriteria
    // Note: It's important to maintain the integrity of each "all" array to allow for multiple selections
    
    // Filter for Gender options based on all criteria except gender itself
    this.allGenders = this.extractUniqueAttributes(
      baseFilteredData.filter(data => 
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.city.length || this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase())) &&
        (!this.filterCriteria.nationalities.length || this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase()))
      ), 'Gender'
    );
  
    // Filter for Location options based on all criteria except location itself
    this.allLocations = this.extractUniqueAttributes(
      baseFilteredData.filter(data => 
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.city.length || this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase())) &&
        (!this.filterCriteria.nationalities.length || this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase()))
      ), 'CountryLocation'
    );
  
    // Repeat the pattern for City, Vertical, and Nationalities filters
    this.allCities = this.extractUniqueAttributes(
      baseFilteredData.filter(data => 
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase())) &&
        (!this.filterCriteria.nationalities.length || this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase()))
      ), 'CityLocation'
    );
  
    this.allVerticals = this.extractUniqueAttributes(
      baseFilteredData.filter(data => 
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.city.length || this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.nationalities.length || this.filterCriteria.nationalities.includes(data.Nationality?.trim().toLowerCase()))
      ), 'MainVertical'
    );
  
    this.allNationalities = this.extractUniqueAttributes(
      baseFilteredData.filter(data => 
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.city.length || this.filterCriteria.city.includes(data.CityLocation?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase()))
      ), 'Nationality'
    );
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


      return (
        isMatchSearch &&
        isMatchGender &&
        isMatchLocation &&
        isMatchVertical &&
        isMatchNationalities &&
        isMatchCity 
      );
    };

    this.dataSource.filter = JSON.stringify(this.filterCriteria);

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
      width: '100%',
      height: '95%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }
}
