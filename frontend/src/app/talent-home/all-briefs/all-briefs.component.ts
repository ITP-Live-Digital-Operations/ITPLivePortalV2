import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';

@Component({
  selector: 'app-all-briefs',
  templateUrl: './all-briefs.component.html',
  styleUrls: ['./all-briefs.component.css']
})
export class AllBriefsComponent implements OnInit {

  briefDetails: any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;

 constructor(private salesService : SalesService, private route : Router){}

  ngOnInit(): void {
    this.getAllBriefs();
  }


  getAllBriefs(){
    this.salesService.getAllAssignedBriefs().subscribe((data:any)=>{

      this.briefDetails = data;
      this.dataSource = new MatTableDataSource(this.briefDetails.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
  }



  displayedColumns: string[] =  [ 'CampaignName','Agency', 'Client','ClientIndustry', 'CampaignObjective', 'NumberofRecommendations', 'ViewedByTalent','Status', 'Action'];

  onRowClicked(row: any) {
    this.viewedTask(row.id);
  }

  viewedTask(id: any){
    this.salesService.viewedByTalent(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.route.navigate([`home/talent/viewSalesBrief/${id}`]);
  }


  backButton() {
    window.history.back();
  }


}
