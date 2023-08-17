import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-view-brief',
  templateUrl: './view-brief.component.html',
  styleUrls: ['./view-brief.component.scss'],
})

export class ViewBriefComponent {

  budgetApproved = false;
  budgetNotes = '';
  budgetData: any;

  presentationApproved = false;
  presentationNotes = '';

  dataSource: any;
  brief: any;
  id: any;
  task!: TaskModel;
  salesperson: any;

  budgetSheetId!: number;
  presentationId!: number;

  budgetSheet: any;
  presentation: any;

  assignedUser: any;
  assignedUser_id: any;
  assigned!: boolean;
  brief_id: any;

  user_id = this.userService.getID();
  privilege_level = this.userService.getPrivilegeLevel();

  progressForm: FormGroup;

  @ViewChild(MainTableComponent) mainComponent!: MainTableComponent;

  constructor(
    private fileService: FileService,
    private salesService: SalesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private taskService: TaskService,
    private location: Location,
  ) {
    this.progressForm = this.formBuilder.group({
      Progress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBriefData();
    this.refresh();
  }

  public submitForm(): void {
    console.log('progress', this.progressForm.value.Progress);

    this.taskService
      .updateProgress(this.task?.id, {
        progress: this.progressForm.value.Progress,
      })
      .subscribe((data: any) => {
        window.location.reload();
      });
  }

  loadBriefData() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.salesService
        .getSalesBriefWithFiles(this.id)
        .subscribe((data: any) => {
          this.brief = data;
          this.assigned = data.data.assigned;

          this.getTask(this.brief.data.id);
          this.brief_id = this.brief.data.id;
          this.getSalesPerson(this.brief.data.CreatedbyID);
          this.budgetSheetId = data.data.BudgetSheetId;

          if (this.budgetSheetId){
          this.getBudgetSheet(this.budgetSheetId);

          }
          this.presentationId = data.data.PresentationId;
          this.getPresentation(this.presentationId);
        });
    });
  }

  getBudgetSheet(id: number) {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.budgetSheet = data.data;
      this.budgetApproved = this.budgetSheet.approved;
      this.budgetNotes = this.budgetSheet.notes;

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
          this.mainComponent.addRow(influencer);
        }
      })
    });
  }

  getPresentation(id: number) {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.presentation = data.data;
      this.presentationApproved = this.presentation?.approved;
      this.presentationNotes = this.presentation?.notes;
    });
  }

  getSalesPerson(id: number) {
    this.userService.getUserNameById(id).subscribe((data: any) => {
      this.salesperson = data.name;
    });
  }

  getTask(id: number) {
    this.taskService.getTaskByBriefId(id).subscribe((data: any) => {
      this.task = data.data[0];
      this.progressForm.setControl(
        'Progress',
        new FormControl(this.task?.progress)
      );
      this.userService
        .getUserNameById(this.task?.assigned_to)
        .subscribe((data: any) => {
          this.assignedUser = data?.name;
          this.assignedUser_id = data?.id;
        });
    });
  }

  refresh(): void {
    const refreshFlag = localStorage.getItem('refreshed-after-sales-brief');

    if (!refreshFlag) {
      localStorage.setItem('refreshed-after-sales-brief', 'true');
      this.location.go(this.location.path());
      window.location.reload();
    }
  }
}
