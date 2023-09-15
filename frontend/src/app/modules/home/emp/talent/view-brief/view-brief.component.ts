import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { FileService } from 'src/app/core/services/file.service';
import { TaskModel } from 'src/app/core/interfaces/task.Model';
import * as XLSX from 'xlsx';
import { MainTableComponent } from './main-table/main-table.component';
import { ToastrService } from 'ngx-toastr';

import { AssignTaskComponent } from './assign-task/assign-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-brief',
  templateUrl: './view-brief.component.html',
  styleUrls: ['./view-brief.component.scss'],
})

export class ViewBriefComponent {

  protected dataSource: any;
  protected brief: any;
  protected id: any;
  protected task!: TaskModel;
  protected salesperson: any;
  private budgetData: any;

  protected budgetSheetId!: number;
  protected presentationId!: number;
  protected budgetSheet: any;
  protected presentation: any;

  protected pdfId!: number;
  protected pdf: any;

  protected assignedUser: any = [];
  protected assignedUser_id: any = [];
  protected assigned!: boolean;
  protected brief_id: any;

  protected user_id = this.userService.getID();
  protected privilege_level = this.userService.getPrivilegeLevel();

  protected progressForm: FormGroup;

  @ViewChild(MainTableComponent) mainComponent!: MainTableComponent;

  constructor(
    private fileService: FileService,
    private salesService: SalesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private taskService: TaskService,
    private location: Location,
    private cdRef: ChangeDetectorRef,
    private toastrService: ToastrService,
    private dialog: MatDialog,

  ) {
    this.progressForm = this.formBuilder.group({
      Progress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBriefData();
    this.refresh();
  }

  protected submitForm(): void {

    this.taskService
      .updateProgress(this.task?.id, {
        progress: this.progressForm.value.Progress,
      })
      .subscribe((data: any) => {
        console.log(data);
        if( data.status === 'success'){
          this.toastrService.success('Progress Updated!');
        }
      });
  }

  public reloadParent($event: any): void {

    if ($event){

    this.loadBriefData();

    this.cdRef.detectChanges();
    }
  }

  public loadBriefData(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.salesService
        .getSalesBriefWithFiles(this.id)
        .subscribe((data: any) => {
          this.brief = data;
          this.assigned = data.data.assigned;
          console.log('assigned');
          console.log(this.assigned);
          this.getTask(this.brief.data.id);
          this.brief_id = this.brief.data.id;
          this.getSalesPerson(this.brief.data.CreatedbyID);

          this.budgetSheetId = data.data.BudgetSheetId;
          if (this.budgetSheetId){
          this.getBudgetSheet(this.budgetSheetId);

          }
          this.presentationId = data.data.PresentationId;
          if (this.presentationId){
          this.getPresentation(this.presentationId);
          }

          this.pdfId = data.data.PdfId;
          if (this.pdfId){
          this.getPDF(this.pdfId);
          }

        });
    });
  }

  private getBudgetSheet(id: number): void {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.budgetSheet = data.data;

      this.fileService.getFilesById(id).subscribe((data: any) => {
        const excelFile = data
        const workbook = XLSX.read(new Uint8Array(excelFile), {type: 'array'});
        const firstSheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[firstSheetName];
        this.budgetData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        for(let i = 0; i < this.budgetData.length; i++) {
          let influencer = {
            id: this.budgetData[i][0],
            Name: this.budgetData[i][1],
            platform: this.budgetData[i][2],
            socialLink: this.budgetData[i][3],
            followers: this.budgetData[i][4],
            deliverables: this.budgetData[i][5],
            currency: this.budgetData[i][6],
            estimatedBudget: this.budgetData[i][7],
          };
          this.mainComponent?.addRow(influencer);
        }
      })
    });
  }

  private getPresentation(id: number): void {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.presentation = data.data;
    });
  }

  private getPDF(id: number): void {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.pdf = data.data;
    });
  }

  private getSalesPerson(id: number): void {
    this.userService.getUserNameById(id).subscribe((data: any) => {
      this.salesperson = data.name;
    });
  }

  private getTask(id: number): void {
    this.taskService.getTaskByBriefId(id).subscribe((data: any) => {
      this.task = data.data;
      console.log(this.task);
      this.progressForm.setControl(
        'Progress',
        new FormControl(this.task?.progress)
      );
      for(let i = 0 ; i < this.task?.assignedUsers?.length ; i++){
        this.assignedUser.push(this.task.assignedUsers[i].name);
        this.assignedUser_id.push(this.task.assignedUsers[i].id);
      }

    });



  }

  private refresh(): void {
    const refreshFlag = localStorage.getItem('refreshed-after-sales-brief');

    if (!refreshFlag) {
      localStorage.setItem('refreshed-after-sales-brief', 'true');
      this.location.go(this.location.path());
      window.location.reload();
    }
  }

  editAssignedExecs(): void {
    const dialogRef = this.dialog?.open(AssignTaskComponent, {
      width: '50%',
      height: '90%',
      data: { task : this.task, briefID : this.brief_id}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
