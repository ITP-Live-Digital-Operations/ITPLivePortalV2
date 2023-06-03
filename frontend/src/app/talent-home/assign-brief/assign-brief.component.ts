import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { TaskService } from 'src/app/core/Services/task.service';
import { UserService } from 'src/app/core/Services/user.service';
import * as alertify from 'alertifyjs';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FileService } from 'src/app/core/Services/file.service';
import { NotificationService } from 'src/app/core/Services/notification.service';

@Component({
  selector: 'app-assign-brief',
  templateUrl: './assign-brief.component.html',
  styleUrls: ['./assign-brief.component.css'],
})
export class AssignBriefComponent implements OnInit {
  dataSource: any;

  task: any;

  exec: any;
  execId: any;

  brief: any;
  brief_id: any;

  salesperson: any;
  salespersonId: any;


  budgetSheetId: any;
  budgetSheet: any;
  presentationId: any;
  presentation: any;

  budgetApproved = false;
  presentationApproved = false;

  assigned: any;

  user_id = this.userService.getID();
  role = this.userService.getRole();
  privilege = this.userService.getPrivilegeLevel();

  assignForm: FormGroup;

  constructor(
    private fileService: FileService,
    private salesService: SalesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private notificationService : NotificationService
  ) {
    this.assignForm = this.formBuilder.group({
      Weight: ['', Validators.required],
      Deadline: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBriefData();
    this.getTalentTaskWeights();
    this.getTask(this.brief_id);
  }

  loadBriefData() {
    this.activatedRoute.params.subscribe((params) => {
      this.brief_id = params['id'];
      this.salesService
        .getSalesBriefWithFiles(this.brief_id)
        .subscribe((data: any) => {
          this.brief = data;
          this.assigned = data.data.assigned;
          this.salespersonId = data.data.CreatedbyID;
          this.getSalesPerson(data.data.CreatedbyID);

          this.budgetSheetId = data.data.BudgetSheetId;

          this.getBudgetSheet(this.budgetSheetId);

          this.presentationId = data.data.PresentationId;
          this.getPresentation(this.presentationId);
        });
    });
  }

  getSalesPerson(id: number) {
    this.userService.getUserNameById(id).subscribe((data: any) => {
      this.salesperson = data.name;
      console.log('salesperson: ' + this.salesperson);
    });
  }

  getTalentTaskWeights() {
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      this.dataSource = data.usersWithTasks;
    });
  }

  assign(id: any) {
    if (this.assignForm.valid) {
      this.taskService
        .createTask({
          assigned_by: this.userService.getID(),
          assigned_to: id,
          brief_id: this.brief.data.id,
          weight: this.assignForm.value.Weight,
          deadline: this.assignForm.value.Deadline,
        })
        .subscribe((data: any) => {
          alertify.success('Task Assigned');
        });
        let input1 = { message : 'Sales Brief has been assigned ', link : `/home/sales/sentBrief/${this.brief.data.id}`};
        this.notificationService.createNotification( this.salespersonId, input1).subscribe((data: any) => {});

        let input2 = { message : 'A task has been assigned to you. ', link : `/home/talent/viewSalesBrief/${this.brief.data.id}`};
        this.notificationService.createNotification( id, input2).subscribe((data: any) => {});

      this.salesService
        .updateAssignedStatus(this.brief.data.id)
        .subscribe((data: any) => {
          alertify.success('Brief Assigned');
          window.location.reload();
        });
    }
  }

  displayedColumns: string[] = ['id', 'name', 'totalWeight', 'Action'];

  @ViewChild('budgetNotes') budgetNotes!: ElementRef;
  @ViewChild('presentationNotes') presentationNotes!: ElementRef;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  backButton() {
    window.history.back();
  }

  fileToUpload: File | null = null;

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
  }

  uploadFileXlsx(): void {
    if (
      this.fileToUpload?.type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      this.fileService
        .uploadFile(this.fileToUpload, this.brief.data.id, this.user_id)
        .subscribe(
          (data) => {
            alertify.success('File uploaded successfully');
            window.location.reload();
          },
          (error) => {
            alertify.error('File upload error');
          }
        );
    } else {
      alertify.error('Wrong file type');
    }
  }

  uploadFilePPTX(): void {
    if (
      this.fileToUpload?.type ==
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      this.fileService
        .uploadFile(this.fileToUpload, this.brief.data.id, this.user_id)
        .subscribe(
          (data) => {
            alertify.success('File uploaded successfully');
            window.location.reload();
          },
          (error) => {
            console.log(error);

            alertify.error('File upload error');
          }
        );
    } else {
      alertify.error('Wrong file type');
    }
  }

  downloadFilePPTX(id: number, filename: string) {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      /* const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
      const url = window.URL.createObjectURL(blob);
      window.open(url); */
    });
  }

  downloadFilexlsx(id: number, filename: string) {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      /* const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url); */
    });
  }

  getBudgetSheet(id: number) {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.budgetSheet = data.data;
      this.budgetApproved = this.budgetSheet.approved;
    });
  }

  getPresentation(id: number) {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.presentation = data.data;
      this.presentationApproved = this.presentation.approved;
    });
  }

  getTask(id: number) {
    this.taskService.getTaskByBriefId(id).subscribe((data: any) => {
      this.task = data.data[0];
      this.execId = data.data[0].assigned_to;
      this.userService.getUserNameById(this.execId).subscribe((data: any) => {
        this.exec = data.name;
      });
    });
  }

  approve(id: number) {
    this.fileService.approveFile(id).subscribe((data: any) => {
      alertify.success('File approved successfully');
      window.location.reload();
    });
  }

  declineBudget() {
    this.fileService
      .addNotes(this.budgetSheetId, this.budgetNotes.nativeElement.value)
      .subscribe((data: any) => {
        alertify.success('Notes Added Successfully');
        window.location.reload();
      });
  }

  declinePresentation() {
    this.fileService
      .addNotes(this.presentationId, this.presentationNotes.nativeElement.value)
      .subscribe((data: any) => {
        alertify.success('Notes Added Successfully');
        window.location.reload();
      });
  }

  deactivateBrief() {
    this.salesService
      .changeStatus(this.brief_id, { status: 'InActive' })
      .subscribe((data1: any) => {
        alertify.success('Brief Deactivated');

        this.taskService
          .deactivateTask(this.brief_id)
          .subscribe((data2: any) => {
            alertify.success('Task Deactivated');
            window.location.reload();
          });
      });
  }

  activateBrief() {
    this.salesService
      .changeStatus(this.brief_id, { status: 'Active' })
      .subscribe((data1: any) => {
        alertify.success('Brief Activated');

        this.taskService.activateTask(this.brief_id).subscribe((data2: any) => {
          alertify.success('Task Activated');
          window.location.reload();
        });
      });
  }
}
