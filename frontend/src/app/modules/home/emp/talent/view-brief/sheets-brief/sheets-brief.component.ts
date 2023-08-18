import { Component, Input } from '@angular/core';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import { TaskModel } from 'src/app/core/interfaces/task.Model';
import { FileService } from 'src/app/core/services/file.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-sheets-brief',
  templateUrl: './sheets-brief.component.html',
  styleUrls: ['./sheets-brief.component.scss'],
})
export class SheetsBriefComponent {

  @Input()
  task!: TaskModel;

  @Input()
  budgetSheetId!: number;

  @Input()
  presentationId!: number;

  @Input()
  budgetSheet: any;

  @Input()
  presentation: any;

  @Input()
  userId!: number;

  @Input()
  brief: any;

  @Input()
  brief_id: any;

  @Input()
  id!: number;

  public path = PATH;

  fileToUpload: File | null = null;
  influencers: InfluencerModel[] = [];

  constructor(
    private fileService: FileService,
    private salesService: SalesService,
    private notificationService: NotificationService,
    private taskService: TaskService
  ) { }

  salesBriefReady() {
    this.salesService.salesBriefReady(this.id).subscribe((data: any) => { 
      if (data?.status == 'success') {
        let id = this.brief?.data.CreatedbyID;
        let input = {
          message: 'Sales Brief is ready',
          link: `${this.path['readyBriefs'] + this.brief?.data.id}`,
        };
        this.notificationService
          .createNotification(id, input)
          .subscribe(() => {});
        this.deactivateBrief();
        // alertify.success('Sales Brief is ready');
      } else {
        // alertify.error('Error');
      }
    });

    this.taskService
      .updateStatusToComplete({ id: this.task.id, assigned_to : this.task.assigned_to})
      .subscribe((data: any) => {
        if (data) {
          // alertify.success('Task is completed');
        } else {
          // alertify.error('Error');
        }
      });
  }

  handleFileInputXLSX(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
    this.uploadFileXlsx();
  }

  handleFileInputPPTX(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
    this.uploadFilePPTX();
  }

  uploadFileXlsx(): void {
    if (this.fileToUpload?.type != 'sheet') {
      if (this.fileToUpload) {
        this.fileService
          .uploadFile(this.fileToUpload, this.brief.data.id, this.userId)
          .subscribe(
            (data) => {
              this.fileService
                .deleteBudgetSheetFile(this.budgetSheetId)
                .subscribe(
                  (data) => {},
                  (error) => {
                    console.log(error);
                  }
                );
              // alertify.success('File uploaded successfully');
              window.location.reload();
            },
            (error) => {
              // alertify.error('File upload error');
            }
          );
      }
    } else {
      // alertify.error('Wrong file type');
    }
  }

  uploadFilePPTX(): void {
    if (this.fileToUpload?.type != 'presentation') {
      if (this.fileToUpload) {
        this.fileService
          .uploadFile(this.fileToUpload, this.brief.data.id, this.userId)
          .subscribe(
            (data) => {
              if (this.presentationId != null) {
                this.fileService
                  .deletePresentationFile(this.presentationId)
                  .subscribe(
                    (data) => {},
                    (error) => {
                      console.log(error);
                    }
                  );
              }
              // alertify.success('File uploaded successfully');
              window.location.reload();
            },
            (error) => {
              // alertify.error('File upload error');
            }
          );
      }
    } else {
      // alertify.error('Wrong file type');
    }
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

  deleteBudgetSheetFile(id: number) {
    this.fileService.deleteBudgetSheetFile(id).subscribe(
      (data) => {
        // alertify.success('File deleted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (error) => {
        // alertify.error('File delete error');
      }
    );
  }

  deletePresentationFile(id: number) {
    this.fileService.deletePresentationFile(id).subscribe(
      (data) => {
        // alertify.success('File deleted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (error) => {
        // alertify.error('File delete error');
      }
    );
  }

  deactivateBrief() {
    this.salesService
      .changeStatus(this.brief_id, { status: 'InActive' })
      .subscribe((data1: any) => {
        // alertify.success('Brief Deactivated');

        this.taskService
          .deactivateTask(this.brief_id)
          .subscribe((data2: any) => {
            // alertify.success('Task Deactivated');
            window.location.reload();
          });
      });
  }
}
