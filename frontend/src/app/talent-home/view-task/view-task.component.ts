import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { TaskService } from 'src/app/core/Services/task.service';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent  implements OnInit{

  brief: any = {};
  id: any;

  constructor(private salesService: SalesService, private activatedRoute:  ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private taskService: TaskService) {

  }
    ngOnInit(): void {
      this.loadBriefData();
    }

  loadBriefData() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']

      this.salesService.getSalesBrief(this.id).subscribe((data: any) => {
        this.brief = data;
        console.log(data);

        /* this.originalDate = new Date(this.brief.date).toDateString();
        this.date = new Intl.DateTimeFormat('en-US', this.options).format(this.originalDate); */
      });
    })
  }

  backButton(){
    window.history.back();
  }

}
