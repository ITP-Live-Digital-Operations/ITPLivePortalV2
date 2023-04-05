import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InfluencerModel } from 'src/app/Models/InfluencerModel';


import { MatSort } from '@angular/material/sort';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';

import { CelebrityService } from 'src/app/core/Services/celebrity.service';
import { ModalpopupCelebrityComponent } from '../modalpopup-celebrity/modalpopup-celebrity.component';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css']
})
export class CelebritiesComponent implements OnInit  {

  dataSource: any;
  UserDetails: any;


  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }

  constructor(private service: CelebrityService, private route: Router, private dialog: MatDialog, ) {}

  ngOnInit(): void {
    this.GetAllCelebrities();


  }




  GetAllCelebrities() {
    this.service.getCelebrities().subscribe((item) => {
      this.UserDetails = item;
      this.dataSource = new MatTableDataSource<InfluencerModel>(this.UserDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCelebrity(inputdata: any) {
    alertify.confirm("Remove User", "Do you want to remove this celebrity ?", () => {
      this.service.deleteCelebrity(inputdata).subscribe((item) => {
        this.GetAllCelebrities();
        alertify.success('Celebrity Deleted.')
      })
    }, function(){})
  }

  editCelebrity(inputdata:any){
    this.dialog.open(ModalpopupCelebrityComponent, {
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
    
    this.route.navigate([`home/talent/celebrityProfile/${row.id}`])
  }

  backButton() {
    window.history.back();
  }

  displayedColumns: string[] = ['ID', 'Name', 'Gender', 'InstagramHandle', 'InstagramFollowers', 'CountryLocation', 'MainVertical', 'Action'];



}
