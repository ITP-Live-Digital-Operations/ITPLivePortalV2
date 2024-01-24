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
                return Number.MAX_VALUE;
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

  private updateFilterDropdowns(): void {
    const renderedData = this.dataSource.filteredData || [];

    this.genders = [
      ...new Set(
        renderedData
          .map((row: { Gender: string }) => row.Gender)
          .filter((gender: string) => gender)
      ),
    ].sort() as string[];

    this.locations = [
      ...new Set(
        renderedData
          .map((row: { CountryLocation: string }) => row.CountryLocation)
          .filter((location: string) => location)
      ),
    ].sort() as string[];

    this.verticals = [
      ...new Set(
        renderedData
          .map((row: { MainVertical: string }) => row.MainVertical)
          .filter((vertical: string) => vertical)
      ),
    ].sort() as string[];

    this.nationalities = [
      ...new Set(
        renderedData
          .map((row: { Nationality: string }) => row.Nationality)
          .filter((nationality: string) => nationality)
      ),
    ].sort() as string[];

    // ... Add other filters as needed

    this.cities = [
      ...new Set(
        renderedData
          .map((row: { CityLocation: string }) => row.CityLocation)
          .filter((city: string) => city)
      ),
    ].sort() as string[];
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
        ? data.Name?.trim()
            .toLowerCase()
            .includes(this.filterCriteria.search) ||
          data.InstagramHandle?.trim()
            .toLowerCase()
            .includes(this.filterCriteria.search)
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
