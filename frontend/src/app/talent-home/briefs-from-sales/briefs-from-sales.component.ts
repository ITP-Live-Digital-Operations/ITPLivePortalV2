import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-briefs-from-sales',
  templateUrl: './briefs-from-sales.component.html',
  styleUrls: ['./briefs-from-sales.component.css']
})
export class BriefsFromSalesComponent implements OnInit {
  briefDetails: any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;

  constructor(private salesService : SalesService, private route: Router, private location: Location) { }

  ngOnInit(): void {
    this.getAllBriefs()
  }


  backButton() {
    window.history.back();
  }

  displayedColumns: string[] =  [ 'CampaignName','Agency', 'Client', 'CampaignObjective' ,'CampaignStartDate', 'Priority', 'ViewedByTalent','SubmittedBy', 'Status', 'Action'];

  getAllBriefs(){
    this.salesService.getAllBriefs().subscribe((data:any)=>{

      this.briefDetails = data;
      this.briefDetails.data.sort((a : any, b : any) => a.Priority - b.Priority);

      this.dataSource = new MatTableDataSource(this.briefDetails.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
  }

  onRowClicked(row: any) {
    this.viewedTask(row.id);
  }

  viewedTask(id: any){

    this.salesService.viewedByTalent(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.route.navigate([`home/talent/assignBrief/${id}`]);
  }




}



