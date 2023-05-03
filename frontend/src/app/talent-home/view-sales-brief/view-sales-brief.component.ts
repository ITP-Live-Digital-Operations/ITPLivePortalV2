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
  user_id = this.userService.getID();
  role = this.userService.getRole();
  privilege_level = this.userService.getPrivilegeLevel();
  assignForm : FormGroup;

  constructor(private salesService: SalesService, private activatedRoute:  ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private taskService: TaskService, private location: Location) {
    this.assignForm = this.formBuilder.group({
      Weight: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBriefData();
    this.loadTalentNames();
    this.getTalentTaskWeights();
    this.refresh();
  }


  loadBriefData() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
      this.salesService.getSalesBrief(this.id).subscribe((data: any) => {
        this.brief = data;


        /* this.originalDate = new Date(this.brief.date).toDateString();
        this.date = new Intl.DateTimeFormat('en-US', this.options).format(this.originalDate); */
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

}
