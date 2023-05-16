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

  task: any;

  salesperson: any;

  budgetSheetId: any;
  budgetSheet: any;
  presentationId: any;
  presentation: any;

  budgetApproved = false;
  budgetNotes = '';

  presentationApproved = false;
  presentationNotes = '';

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
    this.refresh();


   /*  this.budgetApproved = this.budgetSheet.approved
    this.presentationApproved = this.presentation.approved */

  }


  loadBriefData() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
      this.salesService.getSalesBriefWithFiles(this.id).subscribe((data: any) => {

        this.brief = data;



        this.getTask(this.brief.data.id)


        this.getSalesPerson(this.brief.data.CreatedbyID);
        this.budgetSheetId = data.data.BudgetSheetId


        this.getBudgetSheet(this.budgetSheetId);



        this.presentationId = data.data.PresentationId
        this.getPresentation(this.presentationId);
      });
    })
  }

  getSalesPerson(id: number){
    this.userService.getUserNameById(id).subscribe((data: any) => {
      this.salesperson = data.name

    });
  }

  getTask(id : number){
    this.taskService.getTaskByBriefId(id).subscribe((data: any) => {
      console.log(data.data[0]);
      this.task = data.data[0]

    });
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


  fileToUpload: File | null = null;

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
  }

  uploadFileXlsx(): void {
    if( this.fileToUpload?.type != "sheet"){
    if (this.fileToUpload) {
      this.fileService.uploadFile(this.fileToUpload, this.brief.data.id, this.user_id ).subscribe(
        (data) => {


          alertify.success('File uploaded successfully');
          window.location.reload();
        },
        (error) => {


          alertify.error('File upload error');

        }
      );
    }}
    else{
      alertify.error('Wrong file type');
    }
  }

  uploadFilePPTX(): void {
    if( this.fileToUpload?.type != "presentation"){
      if (this.fileToUpload) {
        this.fileService.uploadFile(this.fileToUpload, this.brief.data.id, this.user_id ).subscribe(
          (data) => {


            alertify.success('File uploaded successfully');
            window.location.reload();
          },
          (error) => {


            alertify.error('File upload error');

          }
        );
      }}
      else{
        alertify.error('Wrong file type');
      }
    }



  downloadFilePPTX(id: number, filename: string){
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      /* const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
      const url = window.URL.createObjectURL(blob);
      window.open(url); */
    });
  }

  downloadFilexlsx(id: number, filename: string){
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
     /*  const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url); */
    });
  }


  getBudgetSheet(id: number){
    this.fileService.getFile(id).subscribe((data: any) => {

        this.budgetSheet = data.data;
        this.budgetApproved = this.budgetSheet.approved
        this.budgetNotes = this.budgetSheet.notes

    });
  }

  getPresentation(id: number){
    this.fileService.getFile(id).subscribe((data: any) => {

        this.presentation = data.data;
        this.presentationApproved = this.presentation.approved
        this.presentationNotes = this.presentation.notes

    });
  }

  salesBriefReady(){
    this.salesService.salesBriefReady(this.id).subscribe((data: any) => {

      if( data.status == "success"){
      alertify.success('Sales Brief is ready');
      }
      else{
        alertify.error('Error');
      }


    });

    this.taskService.updateStatusToComplete(this.task.id).subscribe((data: any) => {

        if( data){
        alertify.success('Task is completed');
        }
        else{
          alertify.error('Error');
        }
      })
  }

}
