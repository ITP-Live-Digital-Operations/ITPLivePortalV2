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

import * as pbi from 'powerbi-client';
import { DataService } from 'src/app/core/Services/data.service';


@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {
  dataSource: any;
  UserDetails: any;
  accessToken: any
  private powerBiClient!: pbi.service.Service;




  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;


  ngAfterViewInit() {
    if (this.sort && this.dataSource){
    this.dataSource.sort = this.sort;
    }
  }



  constructor(private service: InfluencerService, private route: Router, private dialog: MatDialog, private dataService: DataService) {}


  ngOnInit(): void {
    this.GetAllInfluencers();

    this.powerBiClient = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
   /*  this.getAccessToken(); */


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

  newInfluencer(){
    this.route.navigate([`home/talent/newInfluencer`])
  }

  displayedColumns: string[] = ['ID', 'Name', 'Gender', 'InstagramHandle', 'InstagramFollowers', 'CountryLocation', 'MainVertical', 'Action'];


  getAccessToken(){
      this.dataService.accessToken().subscribe((response: any) => {
        console.log(response.accessToken);

        this.accessToken= response.accessToken
        this.embedReport( this.accessToken, 'c28ad2fc-34a1-40f3-b2e1-87a769a4eaca', '312b092b-23a6-4061-8881-b2486ee44a96' );
      })
    }

  embedReport(accessToken: string, reportId: string, groupId: string): void {
    const reportContainer = <HTMLElement>document.getElementById('reportContainer');

    const embedConfig: pbi.models.IEmbedConfiguration = {
      type: 'report',
      id: reportId,
      groupId: groupId,
      accessToken: accessToken,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}/ReportSection`,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false
      }
    };

    this.powerBiClient.embed(reportContainer, embedConfig);
  }

}


