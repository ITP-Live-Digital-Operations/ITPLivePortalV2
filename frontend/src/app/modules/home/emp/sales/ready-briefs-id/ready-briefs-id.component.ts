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

  private brief_id: any;
  public brief: any;
  private task: any;

  private budgetSheetId: any;
  private presentationId: any;
  private pdfId: any;
  public budgetSheet: any;
  public presentation: any;
  public pdf: any;


  public salesperson: any;
  public assignedUser: any;

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

  private loadFiles(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.brief_id = params['id'];
      this.salesService.getSalesBrief(this.brief_id).subscribe((res: any) => {
        this.brief = res.data;
        console.log(this.brief);
        this.budgetSheetId = this.brief.BudgetSheetId;

        this.getBudgetSheet(this.budgetSheetId);

        this.presentationId = this.brief.PresentationId;

        this.getPresentation(this.presentationId);

        this.pdfId = this.brief.PdfId;

        this.getPDF(this.pdfId);


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

  private getSalesPerson(id: number): void {
    this.userService.getUserNameById(id).subscribe((data: any) => {
      this.salesperson = data.name;
    });
  }

  private getAssignedUser(id: number): void {
    this.taskService.getTaskByBriefId(id).subscribe((data: any) => {
      this.task = data.data[0];
      this.userService
        .getUserNameById(this.task?.assigned_to)
        .subscribe((data: any) => {
          this.assignedUser = data?.name;
        });
    });
  }

  private getBudgetSheet(id: number): void {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.budgetSheet = data.data;
    });
  }

  private getPresentation(id: number): void {
    this.fileService.getFile(id).subscribe((data: any) => {
      this.presentation = data.data;
    });
  }

  private getPDF(id: number): void {
    this.fileService.getFile(id).subscribe((data: any) => {
      console.log(data);
      this.pdf = data.data;
    });
  }

  public downloadFilePPTX(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  public downloadFilexlsx(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  public downloadFilePDF(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
