import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskModel } from 'src/app/core/interfaces/task.Model';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})

export class PersonInfoComponent {

  constructor(
    private toastrService: ToastrService,
  ) { }
  @Input()
  assignedUser: any;

  @Input()
  salesperson: any;

  @Input()
  task!: TaskModel;

  ngOnChanges(): void {
    if(this.task?.deadline ==  null){
      this.toastrService.warning('Please set a deadline for the task!', 'Set Deadline');
    }
  }
}
