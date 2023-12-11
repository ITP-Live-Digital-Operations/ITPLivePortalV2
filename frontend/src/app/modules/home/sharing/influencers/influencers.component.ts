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
    'Name',
    'Gender',
    'InstagramFollowers',
    'TiktokFollowers',
    'YoutubeFollowers',
    'SnapchatFollowers',
    'TwitterFollowers',
    'FacebookFollowers',
    'CountryLocation',
    'MainVertical',
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
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private dialogService: ConfirmationDialogService
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
    ].sort() as string[];
    this.nationalities = [
      ...new Set(
        renderedData.map((row: { Nationality: any }) => row.Nationality)
      ),
    ].sort() as string[];
    // ... Add other filters as needed
  }

  public onPageChange(event: any): void {
    this.getInfluencers();
  }



  public applyFilter(): void {
    this.dataSource.filterPredicate = (
      data: InfluencerModel,
      filter: string
    ) => {
      const isMatchSearch = this.filterCriteria.search
        ? data.Name?.trim().toLowerCase().includes(this.filterCriteria.search) ||
          data.InstagramHandle?.trim().toLowerCase().includes(this.filterCriteria.search)
        : true;

      return (
        isMatchSearch &&
        (!this.filterCriteria.gender ||
          data.Gender?.trim().toLowerCase() === this.filterCriteria.gender) &&
        (!this.filterCriteria.location ||
          data.CountryLocation?.trim().toLowerCase() ===
            this.filterCriteria.location) &&
        (!this.filterCriteria.vertical ||
          data.MainVertical?.trim().toLowerCase() ===
            this.filterCriteria.vertical) &&
        (!this.filterCriteria.nationalities ||
          data.Nationality?.trim().toLowerCase() ===
            this.filterCriteria.nationalities) &&
        (!this.filterCriteria.city ||
          (data.CityLocation &&
            data.CityLocation?.trim().toLowerCase() ===
              this.filterCriteria.city))
      );
    };

    this.dataSource.filter = JSON.stringify(this.filterCriteria);

    this.updateFilterDropdowns();
  }

  applyFilterChange(filterType: string, filterValue: string): void {
    switch (filterType) {
      case 'gender':
        this.filterCriteria.gender = filterValue.trim().toLowerCase();
        break;
      case 'location':
        this.filterCriteria.location = filterValue.trim().toLowerCase();
        break;
      case 'vertical':
        this.filterCriteria.vertical = filterValue.trim().toLowerCase();
        break;
      case 'nationalities':
        this.filterCriteria.nationalities = filterValue.trim().toLowerCase();
        break;
      case 'city':
        this.filterCriteria.city = filterValue.trim().toLowerCase();
        break;
      case 'search':
        this.filterCriteria.search = filterValue.trim().toLowerCase();
        break;
      // ... add other filters as needed
      default:
        break;
    }
    this.applyFilter();
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
