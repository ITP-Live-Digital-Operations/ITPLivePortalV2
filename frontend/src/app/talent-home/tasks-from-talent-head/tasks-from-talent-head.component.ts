import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { Location } from '@angular/common';
import { TaskService } from 'src/app/core/Services/task.service';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-tasks-from-talent-head',
  templateUrl: './tasks-from-talent-head.component.html',
  styleUrls: ['./tasks-from-talent-head.component.css']
})
export class TasksFromTalentHeadComponent {
  briefDetails: any;
  dataSource: any;
  userID: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort) sort !: MatSort;


  constructor(private salesService : SalesService, private route: Router, private location: Location, private taskService : TaskService, private userService : UserService) { }

  ngOnInit(): void {
    this.userID = this.userService.getID();

    this.getMyTasks(this.userID)


  }

  backButton() {
    window.history.back();
  }

  displayedColumns: string[] =  ['Agency', 'Client','ClientIndustry', 'CampaignObjective', 'NumberofRecommendations', 'status', 'Action' ];

  getMyTasks(id:any){
    this.taskService.getMyTasks(id).subscribe((data:any)=>{
      this.briefDetails = data;
      this.dataSource = new MatTableDataSource(this.briefDetails.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })

  }

  onRowClicked(row: any) {
    this.viewedTask(row.id)
  }

  viewedTask(id:any){


    if(this.briefDetails.data[0].status === 'Not Started'){



    this.taskService.updateStatus({ assigned_to : this.userID, id: id}).subscribe((data:any)=>{
      
    })
  }

    /* we need to get the brief_id from task. task id is in the function  */
    this.salesService.getSalesBriefIdbyTaskId(id).subscribe((data:any)=>{
      this.route.navigate([`home/talent/viewSalesBrief/${data.data.brief_id}`]);
    })
    /* this.route.navigate([`home/talent/viewTask/${id}`]); */
  }
}
