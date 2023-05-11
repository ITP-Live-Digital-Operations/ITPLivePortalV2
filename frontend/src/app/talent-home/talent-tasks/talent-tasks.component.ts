import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/Services/task.service';

@Component({
  selector: 'app-talent-tasks',
  templateUrl: './talent-tasks.component.html',
  styleUrls: ['./talent-tasks.component.css']
})
export class TalentTasksComponent implements OnInit {


  dataSource: any;


  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.getTalentTaskWeights();
  }

  backButton(){
    window.history.back();
  }

  getTalentTaskWeights(){
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      this.dataSource = data.usersWithTasks
    });
  }

  displayedColumns: string[] = ['id', 'name', 'totalWeight'];
}
