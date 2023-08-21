import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-activate',
  templateUrl: './update-activate.component.html',
  styleUrls: ['./update-activate.component.scss'],
})
export class UpdateActivateComponent {

  @Input()
  brief: any;

  @Input()
  brief_id: any;

  public form!: FormGroup;

  @Output() 
  submitEvent = new EventEmitter<void>();

  constructor(
    private salesService: SalesService,
    private taskService: TaskService,
    private rootFormGroup: FormGroupDirective,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  public emitSubmit(): void {
    this.submitEvent.emit();
  }

  public deactivateBrief(): void {
    this.salesService
      .changeStatus(this.brief_id, { status: 'InActive' })
      .subscribe((data1: any) => {
        this.toastrService.success('Brief Deactivated');

        this.taskService
          .deactivateTask(this.brief_id)
          .subscribe((data2: any) => {
            this.toastrService.success('Task Deactivated');
            window.location.reload();
          });
      });
  }

  public activateBrief(): void {
    this.salesService
      .changeStatus(this.brief_id, { status: 'Active' })
      .subscribe((data1: any) => {
        this.toastrService.success('Brief Activated');

        this.taskService.activateTask(this.brief_id).subscribe((data2: any) => {
          this.toastrService.success('Task Activated');
          window.location.reload();
        });
      });
  }
}
