import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InfluencerModel } from 'src/app/Models/InfluencerModel';
import { InfluencerService, PaginatedInfluencers } from 'src/app/core/Services/influencer.service';

import { MatSort } from '@angular/material/sort';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';


import { DataService } from 'src/app/core/Services/data.service';
import { UserService } from 'src/app/core/Services/user.service';


@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {
  dataSource: any;
  UserDetails: any;
  accessToken: any;
  verticals: any[] = [];
  locations: any[] = [];
  genders: any[] = [];
  nationalities: any[] = [];

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
   /*  this.getAccessToken(); */
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
    this.service.getInfluencers().subscribe((response: PaginatedInfluencers) => {


      this.UserDetails = response;
      this.dataSource = new MatTableDataSource<InfluencerModel>(this.UserDetails);
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
    this.route.navigate([`home/talent/influencerProfile/${row.id}`])
  }

  backButton() {
    window.history.back();
  }

  newInfluencer(){
    this.route.navigate([`home/talent/newInfluencer`])
  }

  displayedColumns: string[] = ['ID', 'Name', 'Gender', 'InstagramHandle', 'InstagramFollowers', 'CountryLocation', 'MainVertical', 'Action'];



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

}





