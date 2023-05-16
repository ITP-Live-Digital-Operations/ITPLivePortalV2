import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-view-sent-briefs',
  templateUrl: './view-sent-briefs.component.html',
  styleUrls: ['./view-sent-briefs.component.css']
})
export class ViewSentBriefsComponent implements OnInit{

  dataSource : any
  user_id = this.userService.getID();

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;

  constructor( private userService : UserService, private salesService : SalesService, private router : Router) { }

  ngOnInit(): void {
    this.getSentBriefs();
  }

  getSentBriefs(){
    this.salesService.viewMyBriefs(this.user_id).subscribe((data:any)=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    )
  }

  displayedColumns: string[] = ['CampaignName', 'Agency', 'Client', 'CreatedAt', 'UpdatedAt', 'Action'];

  viewBrief(id:any){
    this.router.navigate([`/home/sales/sentBrief/${id}`]);
  }

  onRowClicked(row: any) {
    this.viewBrief(row.id)
  }

  backButton(){
    window.history.back();
  }
}
