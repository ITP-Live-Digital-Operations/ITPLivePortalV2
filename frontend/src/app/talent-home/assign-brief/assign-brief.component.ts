import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { TaskService } from 'src/app/core/Services/task.service';
import { UserService } from 'src/app/core/Services/user.service';
import * as alertify from 'alertifyjs';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-assign-brief',
  templateUrl: './assign-brief.component.html',
  styleUrls: ['./assign-brief.component.css']
})
export class AssignBriefComponent implements OnInit {
dataSource: any;

brief: any
brief_id: any
assigned : any ;
user_id = this.userService.getID();
role = this.userService.getRole();
privilege = this.userService.getPrivilegeLevel();

assignForm : FormGroup;

constructor(private salesService : SalesService, private activatedRoute : ActivatedRoute, private userService : UserService,private formBuilder: FormBuilder, private taskService : TaskService) {
  this.assignForm = this.formBuilder.group({
    Weight: ['', Validators.required],
  });
 }


ngOnInit(): void {
  this.loadBriefData();
  this.getTalentTaskWeights();
}


loadBriefData(){
  this.activatedRoute.params.subscribe( params => {
    this.brief_id = params['id']
    this.salesService.getSalesBriefWithFiles(this.brief_id).subscribe((data: any) => {

      this.brief = data;
      this.assigned = data.data.Assigned
    });
  })
}

getTalentTaskWeights(){
  this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
    this.dataSource = data.usersWithTasks
  });
}

assign(id: any){
  if(this.assignForm.valid){
  this.taskService.createTask({assigned_by: this.userService.getID() , assigned_to : id, brief_id : this.brief.data.id, weight: this.assignForm.value.Weight}).subscribe((data: any) => {
      alertify.success('Task Assigned');
  });
}
}

displayedColumns: string[] = ['id', 'name', 'totalWeight', 'Action'];

@ViewChild(MatSort, { static: true }) sort !: MatSort;

@ViewChild(MatTable) table!: MatTable<any>;

ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}




backButton(){
    window.history.back();
  }
}
