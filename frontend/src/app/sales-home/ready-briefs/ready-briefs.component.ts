import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-ready-briefs',
  templateUrl: './ready-briefs.component.html',
  styleUrls: ['./ready-briefs.component.css']
})
export class ReadyBriefsComponent implements OnInit {


  dataSource: any;
  briefs: any;
  user_id = this.userService.getID();

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;

  constructor(private salesService: SalesService, private router: Router, private userService : UserService) { }


  ngOnInit(): void {
    this.getReadyBriefs();
  }


  displayedColumns: string[] = ['CampaignName', 'Agency', 'Client', 'CreatedAt', 'UpdatedAt', 'Action'];

  getReadyBriefs(){
    this.salesService.getBriefByCreatedbyId(this.user_id).subscribe((res:any)=>{
      console.log(res);
      this.briefs = res;
      this.dataSource = new MatTableDataSource(this.briefs.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }



  onRowClicked(row:any){
    this.viewFiles(row.id);
  }

  viewFiles(id:any){
    this.salesService.viewBriefBySales(id).subscribe((res:any)=>{

    })
    this.router.navigate([`/home/sales/view-files/${id}`]);
  }

  backButton(){
    window.history.back();
  }

}


