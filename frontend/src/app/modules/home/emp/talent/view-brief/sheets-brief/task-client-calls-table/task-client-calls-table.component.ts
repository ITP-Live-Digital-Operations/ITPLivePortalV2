import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskModel } from 'src/app/core/interfaces/task.Model';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-client-calls-table',
  templateUrl: './task-client-calls-table.component.html',
  styleUrls: ['./task-client-calls-table.component.scss']
})
export class TaskClientCallsTableComponent {
  form!: FormGroup;

  @Input()
  task!: TaskModel;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      introCallStatus: new FormControl(false),
      introCallDate: new FormControl(''),
      introCallNotes: new FormControl(''),

      briefCallStatus: new FormControl(false),
      briefCallDate: new FormControl(''),
      briefCallNotes: new FormControl(''),

      presentationCallStatus: new FormControl(false),
      presentationCallDate: new FormControl(''),
      presentationCallNotes: new FormControl(''),
    });


  }

  ngOnChanges(): void {
    console.log(this.task?.ClientCalls);
    if(this.task?.ClientCalls != null){
      this.form.patchValue({
        introCallStatus: this.task?.ClientCalls.introStatus,
        introCallDate: this.task?.ClientCalls.introDate,
        introCallNotes: this.task?.ClientCalls.introNotes,

        briefCallStatus: this.task?.ClientCalls.briefStatus,
        briefCallDate: this.task?.ClientCalls.briefDate,
        briefCallNotes: this.task?.ClientCalls.briefNotes,

        presentationCallStatus: this.task?.ClientCalls.presentationStatus,
        presentationCallDate: this.task?.ClientCalls.presentationDate,
        presentationCallNotes: this.task?.ClientCalls.presentationNotes,
      });
    }
  }


  onSubmit(): void {
    const newclientCall = { taskId: this.task.id, ...this.form.value };

    const editedCall = {...this.form.value};

    if(this.task?.ClientCalls == null){
      this.taskService.createTaskClientCall(newclientCall).subscribe((res: any) => {
        if(res.status == "success"){
          this.toastr.success('Client Call Created Successfully');
        }
        window.location.reload();
      });
  } else {
    this.taskService.editTaskClientCall(this.task?.ClientCalls.id, editedCall).subscribe((res: any) => {
      console.log(res);
      if(res.status == "success"){
        this.toastr.success('Client Call updated Successfully');
      }
      window.location.reload();
    });
  }

}


}
