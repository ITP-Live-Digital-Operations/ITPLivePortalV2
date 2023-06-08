import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { TaskService } from 'src/app/core/Services/task.service';

@Component({
  selector: 'app-exec-tasks',
  templateUrl: './exec-tasks.component.html',
  styleUrls: ['./exec-tasks.component.css']
})
export class ExecTasksComponent implements OnInit {

  id : any;
  dataSource: any;

  constructor(private activatedRoute: ActivatedRoute, private taskService : TaskService, private salesService : SalesService, private route : Router) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];

      this.taskService.getMyTasks(this.id).subscribe((data: any) => {
        this.dataSource = data.data
      })
  })
  }

  onRowClicked(row: number) {
    this.salesService.getSalesBriefIdbyTaskId(row).subscribe((data: any) => {


    this.route.navigate([`home/talent/viewSalesBrief/${data.data.brief_id}`]);
  })
}


  backButton(){
    window.history.back();
  }

  displayedColumns: string[] = ['id', 'deadline', 'progress', 'weight' ,'status', 'action'];
}
