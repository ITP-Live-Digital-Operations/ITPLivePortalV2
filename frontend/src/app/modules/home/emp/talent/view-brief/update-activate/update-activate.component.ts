import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { AssignTaskComponent } from '../assign-task/assign-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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

  @Input()
  task: any;
  protected user_id = this.userService.getID();
  protected privilege_level = this.userService.getPrivilegeLevel();
  protected assigned!: boolean;
  protected id: any;
  protected talentHeads: any;
  public form!: FormGroup;

  @Output()
  submitEvent = new EventEmitter<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private salesService: SalesService,
    private taskService: TaskService,
    private userService: UserService,
    private rootFormGroup: FormGroupDirective,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    this.getTalentHeads();
    this.loadBriefData();
    
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
  editAssignedExecs(): void {
    const dialogRef = this.dialog?.open(AssignTaskComponent, {
      width: '50%',
      height: '90%',
      data: { task: this.task, briefID: this.brief_id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }
  private getTalentHeads(): void {
    this.userService.getTalentHeads().subscribe((data: any) => {
      this.talentHeads = data;
    });
  }
  public loadBriefData(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.salesService
        .getSalesBriefWithFiles(this.id)
        .subscribe((data: any) => {
          this.assigned = data.data.assigned;

        });

    });
  }
  
}
