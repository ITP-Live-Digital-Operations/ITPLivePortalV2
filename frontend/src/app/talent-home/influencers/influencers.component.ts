import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InfluencerModel } from 'src/app/Models/InfluencerModel';
import { InfluencerService, PaginatedInfluencers } from 'src/app/core/Services/influencer.service';

import { MatSort } from '@angular/material/sort';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';



@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {
  dataSource: any;
  UserDetails: any;





  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;


  ngAfterViewInit() {
    if (this.sort && this.dataSource){
    this.dataSource.sort = this.sort;
    }
  }



  constructor(private service: InfluencerService, private route: Router, private dialog: MatDialog) {}


  ngOnInit(): void {
    this.GetAllInfluencers();

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

  applyFilter(filterValue: string) {
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



  displayedColumns: string[] = ['ID', 'Name', 'Gender', 'InstagramHandle', 'InstagramFollowers', 'CountryLocation', 'MainVertical', 'Action'];
}


