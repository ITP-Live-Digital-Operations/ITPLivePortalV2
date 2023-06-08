import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/Services/task.service';

@Component({
  selector: 'app-talent-tasks',
  templateUrl: './talent-tasks.component.html',
  styleUrls: ['./talent-tasks.component.css']
})
export class TalentTasksComponent implements OnInit {


  dataSource: any;


  constructor(private taskService : TaskService, private route : Router) { }

  ngOnInit(): void {
    this.getTalentTaskWeights();
  }

  backButton(){
    window.history.back();
  }

  getTalentTaskWeights(){
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data.usersWithTasks
    });
  }

  onRowClicked(row: number) {
    this.route.navigate([`home/talent/execTasks/${row}`]);
  }

  displayedColumns: string[] = ['name', 'totalWeight', 'action'];
}
