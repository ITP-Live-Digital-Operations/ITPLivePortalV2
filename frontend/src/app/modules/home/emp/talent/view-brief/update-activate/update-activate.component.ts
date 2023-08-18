import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-activate',
  templateUrl: './update-activate.component.html',
  styleUrls: ['./update-activate.component.scss'],
})
export class UpdateActivateComponent {
  user_id = this.userService.getID();

  @Input()
  brief: any;

  @Input()
  brief_id: any;

  form!: FormGroup;

  @Output() 
  submitEvent = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private salesService: SalesService,
    private taskService: TaskService,
    private rootFormGroup: FormGroupDirective
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  emitSubmit() {
    this.submitEvent.emit();
  }

  deactivateBrief() {
    this.salesService
      .changeStatus(this.brief_id, { status: 'InActive' })
      .subscribe((data1: any) => {
        // alertify.success('Brief Deactivated');

        this.taskService
          .deactivateTask(this.brief_id)
          .subscribe((data2: any) => {
            // alertify.success('Task Deactivated');
            window.location.reload();
          });
      });
  }

  activateBrief() {
    this.salesService
      .changeStatus(this.brief_id, { status: 'Active' })
      .subscribe((data1: any) => {
        // alertify.success('Brief Activated');

        this.taskService.activateTask(this.brief_id).subscribe((data2: any) => {
          // alertify.success('Task Activated');
          window.location.reload();
        });
      });
  }
}
