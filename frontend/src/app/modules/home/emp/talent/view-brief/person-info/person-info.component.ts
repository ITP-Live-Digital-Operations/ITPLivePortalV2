import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/app/core/interfaces/task.Model';



@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent {
  @Input()
  assignedUser: any;

  @Input()
  salesperson: any;

  @Input()
  task!: TaskModel;
}
