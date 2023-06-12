import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InfluencerModel } from 'src/app/Models/InfluencerModel';
import { DataService } from 'src/app/core/Services/data.service';
import { InfluencerService, PaginatedInfluencers } from 'src/app/core/Services/influencer.service';
import { UserService } from 'src/app/core/Services/user.service';
import { ModalpopupComponent } from 'src/app/talent-home/modalpopup/modalpopup.component';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-show-influencers',
  templateUrl: './show-influencers.component.html',
  styleUrls: ['./show-influencers.component.css']
})
export class ShowInfluencersComponent implements OnInit {
  dataSource: any;
  UserDetails: any;
  accessToken: any;
  verticals: any[] = [];
  locations: any[] = [];
  genders: any[] = [];
  nationalities: any[] = [];
  platforms: any[] = ['Instagram', 'Tiktok', 'Snapchat', 'Twitter', 'Facebook', 'Youtube'];

  platform: string = 'Instagram';

  userRole = this.userService.getRole();


  filterCriteria: any = {
    gender: '',
    location: '',
    vertical: '',
    nationality: ''
  };


  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  ngAfterViewInit() {
    if (this.sort && this.dataSource){
    this.dataSource.sort = this.sort;
    }
    this.extractColumnData();
  }



  constructor(private service: InfluencerService, private route: Router, private dialog: MatDialog, private dataService: DataService, private userService : UserService) {}


  ngOnInit(): void {
    this.GetAllInfluencers();

    this.getGenders();
    this.getLocations();
    this.getVerticals();
    this.getNationalities();

  }

  extractColumnData(): void {
    const renderedData = this.table['_data'];

    for (let i = 0; i < renderedData.length; i++) {
      const row = renderedData[i];
      this.genders.push(row.Gender);
      this.locations.push(row.CountryLocation);
      this.verticals.push(row.MainVertical);
      this.nationalities.push(row.Nationality);


    }

  }

  getGenders() {
    this.service.getGenders().subscribe((response: any) => {

      this.genders = response.map((obj: { genders: any; }) => obj.genders)
                              .filter( (str: string) => str !== '')
                              .sort();


    })
  }

  getLocations() {
    this.service.getLocations().subscribe((response: any) => {
      this.locations = response.map((obj: { locations: any; }) => obj.locations)
                                .filter( (str: string) => str !== '')
                                .sort();
    })
  }

  getVerticals() {
    this.service.getVerticals().subscribe((response: any) => {
      this.verticals = response.map((obj: { verticals: any; }) => obj.verticals)
                                .filter( (str: string) => str !== '')
                                .sort();
    })
  }

  getNationalities() {
    this.service.getNationalities().subscribe((response: any) => {
      this.nationalities = response.map((obj: { nationalities: any; }) => obj.nationalities)
                                .filter( (str: string) => str !== '')
                                .sort();
    })
  }



  GetAllInfluencers() {
    this.service.getInfluencersWithRatings().subscribe((response: PaginatedInfluencers) => {


      this.UserDetails = response
      console.log(this.UserDetails);
      this.dataSource = new MatTableDataSource<InfluencerModel>(this.UserDetails.influencers);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 0);



    })
  }

  onPageChange(event: any): void {
    console.log('Previous page index:', event.previousPageIndex); // Debugging
    console.log('Current page index:', event.pageIndex); // Debugging
    this.GetAllInfluencers();
  }

  applyFilterSearch(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteInfluencer(inputdata: any) {
    alertify.confirm("Remove User", "Do you want to remove this influencer ?", () => {
      this.service.deleteInfluencer(inputdata).subscribe((item) => {
        this.GetAllInfluencers();
        alertify.success('Influencer Deleted.')
      })
    }, function(){})
  }

  editInfluencer(inputdata:any){
    this.dialog.open(ModalpopupComponent, {
      width: '80%',
      height: '70%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{
        id: inputdata
      }
    })
  }



  onRowClicked(row: any) {
    this.route.navigate([`home/sales/influencer/${row.id}`])
  }

  backButton() {
    window.history.back();
  }

  newInfluencer(){
    this.route.navigate([`home/talent/newInfluencer`])
  }

  displayedColumns: string[] = ['ID', 'Name', 'Gender', 'InstagramHandle', 'InstagramFollowers', 'CountryLocation', 'MainVertical', 'itpAverageRating'];



  applyFilter() {
    this.dataSource.filterPredicate = (data: InfluencerModel, filter: string) => {
      return (!this.filterCriteria.gender || data.Gender.trim().toLowerCase() === this.filterCriteria.gender) &&
        (!this.filterCriteria.location || data.CountryLocation.trim().toLowerCase() === this.filterCriteria.location) &&
        (!this.filterCriteria.vertical || data.MainVertical.trim().toLowerCase() === this.filterCriteria.vertical) &&
        (!this.filterCriteria.nationality || data.Nationality.trim().toLowerCase() === this.filterCriteria.nationality);
    };

    this.dataSource.filter = JSON.stringify(this.filterCriteria);
  }

  applyFilter1(filterValue: string) {
    this.filterCriteria.gender = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  applyFilter2(filterValue: string) {
    this.filterCriteria.location = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  applyFilter3(filterValue: string) {
    this.filterCriteria.vertical = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  applyFilter4(filterValue: string) {
    this.filterCriteria.nationality = filterValue.trim().toLowerCase();
    this.applyFilter();

  }

  applyPlatformFilter(platform: string) {
    this.platform = platform;

    const baseColumns = ['ID', 'Name', 'Gender', 'CountryLocation'];

    let platformColumns = [];

    switch (platform) {
      case 'Instagram':
        platformColumns = ['InstagramHandle', 'InstagramFollowers', 'MainVertical', 'itpAverageRating'];
        break;
      case 'Tiktok':
        platformColumns = ['TiktokHandle', 'TiktokFollowers', 'MainVertical', 'itpAverageRating'];
        break;
      case 'Snapchat':
        platformColumns = ['SnapchatHandle', 'SnapchatFollowers', 'MainVertical', 'itpAverageRating'];
        break;
      case 'Twitter':
        platformColumns = ['TwitterHandle', 'TwitterFollowers', 'MainVertical', 'itpAverageRating'];
        break;
      case 'Facebook':
        platformColumns = ['FacebookHandle', 'FacebookFollowers', 'MainVertical', 'itpAverageRating'];
        break;
      case 'Youtube':
        platformColumns = ['YoutubeHandle', 'YoutubeFollowers', 'MainVertical', 'itpAverageRating'];
        break;
      default:
        platformColumns = ['InstagramHandle', 'InstagramFollowers', 'MainVertical', 'itpAverageRating']
        break;
    }

    this.displayedColumns = [...baseColumns, ...platformColumns];



}

}
