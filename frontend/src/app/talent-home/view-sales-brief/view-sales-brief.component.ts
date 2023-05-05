import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { TaskService } from 'src/app/core/Services/task.service';
import { UserService } from 'src/app/core/Services/user.service';
import * as alertify from 'alertifyjs';
import { Location } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FileService } from 'src/app/core/Services/file.service';


@Component({
  selector: 'app-view-sales-brief',
  templateUrl: './view-sales-brief.component.html',
  styleUrls: ['./view-sales-brief.component.css']
})
export class ViewSalesBriefComponent implements OnInit{
  dataSource: any;

  brief: any;
  id: any;
  date: any
  originalDate: any
  talentEmployees: any;

  budgetSheetId: any;
  budgetSheet: any;
  presentationId: any;
  presentation: any;

  user_id = this.userService.getID();
  role = this.userService.getRole();
  privilege_level = this.userService.getPrivilegeLevel();
  assignForm : FormGroup;

  constructor(private fileService: FileService ,private salesService: SalesService, private activatedRoute:  ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private taskService: TaskService, private location: Location) {
    this.assignForm = this.formBuilder.group({
      Weight: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBriefData();
    if(this.privilege_level > 7){
    this.getTalentTaskWeights();
    }
    this.refresh();

  }


  loadBriefData() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
      this.salesService.getSalesBriefWithFiles(this.id).subscribe((data: any) => {

        this.brief = data;
        this.budgetSheetId = data.data.BudgetSheetId

        this.getBudgetSheet(this.budgetSheetId);


        this.presentationId = data.data.PresentationId
        this.getPresentation(this.presentationId);
      });
    })
  }

  loadTalentNames(){

    this.userService.getTalentUserIdNames().subscribe((data: any) => {

      this.talentEmployees = data;

    });
  }

  assign(id: any){
    if(this.assignForm.valid){
    this.taskService.createTask({assigned_by: this.userService.getID() , assigned_to : this.assignForm.value.Employee, brief_id : this.brief.data.id, weight: this.assignForm.value.Weight}).subscribe((data: any) => {
        alertify.success('Task Assigned');
    });
  }
    }

  backButton(){
    window.history.back();
  }

  refresh(): void {
    const refreshFlag = localStorage.getItem('refreshed-after-sales-brief');

      if (!refreshFlag) {
      localStorage.setItem('refreshed-after-sales-brief', 'true');
      this.location.go(this.location.path());
      window.location.reload();
    }
  }


  displayedColumns: string[] = ['id', 'name', 'totalWeight', 'Action'];

  @ViewChild(MatSort, { static: true }) sort !: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }

  getTalentTaskWeights(){
      this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
        this.dataSource = data.usersWithTasks
      });
  }


  fileToUpload: File | null = null;

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
  }

  uploadFile(): void {
    if (this.fileToUpload) {
      this.fileService.uploadFile(this.fileToUpload, this.brief.data.id, this.user_id ).subscribe(
        (data) => {
          console.log(data);

          alertify.success('File uploaded successfully');

        },
        (error) => {
          console.log(error);

          alertify.error('File upload error');

        }
      );
    }
  }


  downloadFilePPTX(id: number){
    this.fileService.downloadFile(id).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  downloadFilexlsx(id: number){
    this.fileService.downloadFile(id).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }


  getBudgetSheet(id: number){
    this.fileService.getFile(id).subscribe((data: any) => {
        this.budgetSheet = data.data;
    });
  }

  getPresentation(id: number){
    this.fileService.getFile(id).subscribe((data: any) => {
        this.presentation = data.data;
    });
  }



}
