import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { FileService } from 'src/app/core/services/file.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { InitiateCampaignComponent } from './initiate-campaign/initiate-campaign.component';

@Component({
  selector: 'app-ready-briefs-id',
  templateUrl: './ready-briefs-id.component.html',
  styleUrls: ['./ready-briefs-id.component.scss'],
})
export class ReadyBriefsIdComponent {
  private brief_id: any;
  public brief: any;
  public task: any;
  public acceptedBrief = false;

  private budgetSheetId: any;
  private presentationId: any;
  private pdfId: any;
  public budgetSheet: any;
  public presentation: any;
  public pdf: any;

  public salesperson: any;
  public assignedUser: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private salesService: SalesService,
    private userService: UserService,
    private taskService: TaskService,
    private toastr: ToastrService,
    private notificationService: NotificationService,
    private campaignService: CampaignService,
    private dialog: MatDialog
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
          this.getSalesPerson(data.data.CreatedbyID);
          this.getAssignedUser(data.data.id);
        });
    });
  }

  protected initiateCampaign(): void {
    this.dialog.open(InitiateCampaignComponent, {
      width: '80%',
      height: '70%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        brief: this.brief,
      },
    });
  }

  signedOffByClient(): void {
    this.salesService
      .signedOffByClient(this.brief_id)
      .subscribe((data: any) => {
        this.loadFiles();
        this.toastr.success(data.message, 'Success');
      });
  }

  private getSalesPerson(id: number): void {
    this.userService.getUserNameById(id).subscribe((data: any) => {
      this.salesperson = data.name;
    });
  }

  private getAssignedUser(id: number): void {
    this.taskService.getTaskByBriefId(id).subscribe((data: any) => {
      if (
        data.data.History[data.data.History.length - 1].feedback === 'Accept'
      ) {
        this.acceptedBrief = true;
      }

      this.task = data.data;

      for (let i = 0; i < this.task?.assignedUsers?.length; i++) {
        let userName = this.task.assignedUsers[i].name;
        if (!this.assignedUser.includes(userName)) {
          this.assignedUser.push(userName);
        }
      }
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
      this.pdf = data.data;
    });
  }

  public downloadFilePPTX(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  public downloadFilexlsx(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  public downloadFilePDF(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
