import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import { CelebrityService } from 'src/app/core/services/celebrity.service';
import { EditCelebrityComponent } from '../../edit/edit-celebrity/edit-celebrity.component';
import { CelebrityIdComponent } from '../celebrity-id/celebrity-id.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { MatSelect } from '@angular/material/select';
import { CelebrityModel } from 'src/app/core/interfaces/celebrity.model';
@Component({
  selector: 'app-celebrities-list',
  templateUrl: './celebrities-list.component.html',
  styleUrls: ['./celebrities-list.component.scss'],
})
export class CelebritiesListComponent {
  public isLoading = true;
  public dataSource: any;
  public UserDetails: any;
  public verticals: string[] = [];
  public locations: string[] = [];
  public genders: string[] = [];
  public games: string[] = [];
  public allGenders: string[] = []; // This array will be used to populate the mat-select
  public allLocations: string[] = [];
  public allCities: string[] = [];
  public allVerticals: string[] = [];
  public allGames: string[] = [];

  filterCriteria: any = {
    search: '',
    gender: [],
    location: [],
    vertical: [],
    games: [],

  };



  public userRole = this.userService.getRole();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInputElement!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('genderSelect') genderSelect!: MatSelect;
  @ViewChild('locationSelect') locationSelect!: MatSelect;
  @ViewChild('verticalSelect') verticalSelect!: MatSelect;
  @ViewChild('gameSelect') gameSelect!: MatSelect;
  displayedColumns: string[] = [
    'Name',
    'InstagramFollowers',
    'TiktokFollowers',
    'TwitterFollowers',
    'YoutubeFollowers',
    'TwitchFollowers',
    'CountryLocation',
    'MainVertical',
    'Game',
    'Action',
  ];

  constructor(
    private service: CelebrityService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private userService: UserService,
    private dialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.GetAllCelebrities();
  }

  private GetAllCelebrities(): void {
    this.isLoading = true;
    this.service.getCelebrities().subscribe((item) => {
      this.UserDetails = item;

      this.isLoading = false;
      this.dataSource = new MatTableDataSource<CelebrityModel>(

        this.UserDetails
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.populateFilterParameters();

    });
  }
  private populateFilterParameters(): void {
    // Assuming dataSource.data is an array of your items
    const data = this.dataSource.data;

    // Extract and assign unique values for each filter
    this.allGenders = this.extractUniqueAttributes(data, 'Gender');
    this.allLocations = this.extractUniqueAttributes(data, 'CountryLocation');
    this.allVerticals = this.extractUniqueAttributes(data, 'MainVertical');
    this.allGames = this.extractUniqueAttributes(data, 'Game');
  }

  private extractUniqueAttributes(data: any[], attribute: string): string[] {
    const uniqueValues = new Set(data.map(item => item[attribute]).filter(Boolean));
    return Array.from(uniqueValues).sort();
  }

  public resetFilters(): void {
    // Reset filter criteria
    this.filterCriteria = {
      search: '',
      gender: [],
      location: [],
      vertical: [],
      games: [],

    };

    this.allGenders = this.extractUniqueAttributes(this.dataSource.data, 'Gender');
    this.allLocations = this.extractUniqueAttributes(this.dataSource.data, 'CountryLocation');
    this.allVerticals = this.extractUniqueAttributes(this.dataSource.data, 'MainVertical');
    this.allGames = this.extractUniqueAttributes(this.dataSource.data, 'Game');
    // Clear the search input
  if (this.searchInputElement && this.searchInputElement.nativeElement) {
    this.searchInputElement.nativeElement.value = '';
  }
    this.resetMatSelects();
    this.applyFilter();
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
        (!this.filterCriteria.games.length || this.filterCriteria.games.includes(data.Game?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase()))  ), 'Gender'
    );

    // Filter for Location options based on all criteria except location itself
    this.allLocations = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.games.length || this.filterCriteria.games.includes(data.Game?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase())) ), 'CountryLocation'
    );


    this.allVerticals = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.games.length || this.filterCriteria.games.includes(data.Game?.trim().toLowerCase())) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) ), 'MainVertical'
    );

    this.allGames = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        (!this.filterCriteria.gender.length || this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase())) &&
        (!this.filterCriteria.vertical.length || this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase())) &&
        (!this.filterCriteria.location.length || this.filterCriteria.location.includes(data.CountryLocation?.trim().toLowerCase())) ), 'Game'
    );


  }
  private resetMatSelects(): void {
    if (this.genderSelect) {
      this.genderSelect.value = [];
    }
    if (this.locationSelect) {
      this.locationSelect.value = [];
    }

    if (this.verticalSelect) {
      this.verticalSelect.value = [];
    }
    if (this.gameSelect) {
      this.gameSelect.value = [];
    }
  }

  public applyFilter(): void {
    this.dataSource = new MatTableDataSource<CelebrityModel>(this.UserDetails);

    // Define the filter predicate
    this.dataSource.filterPredicate = (data: CelebrityModel, filter: string) => {
      const filterObject = JSON.parse(filter);

      const isMatchSearch = filterObject.search
        ? data.Name?.trim().toLowerCase().includes(filterObject.search) ||
          data.InstagramHandle?.trim().toLowerCase().includes(filterObject.search)
        : true;

      const isMatchGender = !this.filterCriteria.gender.length ||
      this.filterCriteria.gender.includes(data.Gender?.trim().toLowerCase());

      const isMatchLocation = !filterObject.location.length ||
      filterObject.location.includes(data.CountryLocation?.trim().toLowerCase());


      const isMatchVertical = !this.filterCriteria.vertical.length ||
      this.filterCriteria.vertical.includes(data.MainVertical?.trim().toLowerCase());

const isMatchGames = !filterObject.games.length || (data.Game && filterObject.games.includes(data.Game.toLowerCase()));



      return (
        isMatchSearch &&
        isMatchGender &&
        isMatchLocation &&
        isMatchVertical
         &&
        isMatchGames
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
        case 'game':
          this.filterCriteria.games = filterValue.map((val: string) => val.trim().toLowerCase());
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

  public deleteCelebrity(inputdata: any): void {
    this.dialogService.openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe(result => {
        if (result === true) {
          this.toastrService.success('Deleted Successfully!');
          this.service.deleteCelebrity(inputdata).subscribe((item) => {
            this.GetAllCelebrities();
          });
        }
      });
  }

  public editCelebrity(inputdata: any): void {
    this.dialog.open(EditCelebrityComponent, {
      width: '990px', // Set initial width to 'auto'
      height: '700px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }

  public viewCelebrity(inputdata: any): void {
    this.dialog.open(CelebrityIdComponent, {
      width: '100%',
      height: '95%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }

  public openLink(link: string): void {
    if (!link) {
      return;
    }
    window.open(link, '_blank');
  }
}
