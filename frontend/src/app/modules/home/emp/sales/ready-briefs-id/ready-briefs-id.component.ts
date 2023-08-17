import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-ready-briefs-id',
  templateUrl: './ready-briefs-id.component.html',
  styleUrls: ['./ready-briefs-id.component.scss'],
})
export class ReadyBriefsIdComponent {
  brief_id: any;
  brief: any;
  budgetSheetId: any;
  presentationId: any;

  salesperson: any;
  assignedUser: any;
  task: any;

  budgetSheet: any;
  presentation: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private salesService: SalesService,
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.activatedRoute.params.subscribe((params) => {
      this.brief_id = params['id'];
      this.salesService.getSalesBrief(this.brief_id).subscribe((res: any) => {
        this.brief = res.data;
        this.budgetSheetId = this.brief.BudgetSheetId;

        this.getBudgetSheet(this.budgetSheetId);

        this.presentationId = this.brief.PresentationId;

        this.getPresentation(this.presentationId);
      });
      this.salesService
        .getSalesBriefWithFiles(this.brief_id)
        .subscribe((data: any) => {
          this.brief = data;
          this.getSalesPerson(this.brief.data.CreatedbyID);
          this.getAssignedUser(this.brief.data.id);
        }
        )
    });
      
  }

  getSalesPerson(id: number) {
    this.userService.getUserNameById(id).subscribe((data: any) => {
      this.salesperson = data.name;
    });
  }

  getAssignedUser(id: number) {
    this.taskService.getTaskByBriefId(id).subscribe((data: any) => {
      this.task = data.data[0];
      this.userService
        .getUserNameById(this.task?.assigned_to)
        .subscribe((data: any) => {
          this.assignedUser = data?.name;
        });
    });
  }

  getBudgetSheet(id: number) {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.budgetSheet = data.data;
    });
  }

  getPresentation(id: number) {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.presentation = data.data;
    });
  }

  downloadFilePPTX(id: number, filename: string) {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  downloadFilexlsx(id: number, filename: string) {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
