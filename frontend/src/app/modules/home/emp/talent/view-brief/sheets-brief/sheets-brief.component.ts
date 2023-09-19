import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import { TaskModel } from 'src/app/core/interfaces/task.Model';
import { FileService } from 'src/app/core/services/file.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UploadFilesComponent } from 'src/app/modules/home/sharing/upload-files/upload-files.component';
import { MainTableComponent } from '../main-table/main-table.component';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { Department } from 'src/app/core/constant/values.constants';

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

  @Input()
  pdfId!: number;

  @Input()
  pdf: any;

  @Input()
  assignedUser_id : any;

  @Output()
  childEvent = new EventEmitter<string>();

  public path = PATH;

  private fileToUpload: File | null = null;

  constructor(
    private fileService: FileService,
    private salesService: SalesService,
    private notificationService: NotificationService,
    private taskService: TaskService,
    private toastrService: ToastrService,
    private dialog : MatDialog,
    private dialogService: ConfirmationDialogService
  ) {

  }

  public salesBriefReady(): void {
    this.salesService.salesBriefReady(this.id).subscribe((data: any) => {
      if (data?.status == 'success') {
        let id = this.brief?.data.CreatedbyID;
        let input = {
          message: 'Sales Brief is waiting for your feedback',
          link: `${this.path['readyBriefs'] + this.brief?.data.id}`,
        };
        this.notificationService
          .createNotification(id, input)
          .subscribe(() => {});

        this.taskService
        .updateProgress(this.task?.id, {
          progress: 'Waiting for feedback',
        })
        .subscribe((data: any) => {
        });
        this.taskService.addRoundtoTask(this.task?.id).subscribe((data: any) => {});
        this.toastrService.success('Sales Brief is waiting for feedback!');
      } else {
        this.toastrService.error('Error!');
      }
    });


  }



  public handleFileInput(event: Event, n ?: number): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);

    if (this.fileToUpload && this.fileToUpload.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
      this.uploadFilePPTX();
    }
    else if (this.fileToUpload &&  this.fileToUpload?.type == 'application/pdf') {
      this.uploadFilePDF();
    }
    else if (this.fileToUpload &&  this.fileToUpload?.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      this.uploadFileXlsx();
    }
    else {
      this.toastrService.error('Invalid file or wrong file type. Please upload a valid file.');
    }
  }

  private uploadFileXlsx(): void {
    if (this.fileToUpload) {

      this.fileService.uploadFile(this.fileToUpload, this.brief?.data.id, this.userId, Department['TALENT'])
        .subscribe(
          (data) => {
            // On successful upload, delete the old budget sheet if exists
            if (this.budgetSheetId != null) {
              this.fileService.deleteBudgetSheetFile(this.budgetSheetId)
                .subscribe(
                  (deleteData) => {
                    this.toastrService.success('File uploaded and old budget sheet deleted successfully!');
                    // Instead of reloading, consider fetching data or updating the component's state as required
                    // For the sake of this example, I'll leave it commented out:
                    // this.fetchData(); or this.updateState();
                    this.childEvent.emit('event');

                  },
                  (deleteError) => {
                    this.toastrService.error('Error deleting old budget sheet!');
                    console.error(deleteError);
                  }
                );
            } else {
              this.toastrService.success('File uploaded successfully!');
              // Similar as above, consider updating state or fetching data
              // this.fetchData(); or this.updateState();
              this.childEvent.emit('event');
            }
          },
          (uploadError) => {
            this.toastrService.error('File upload error!');
            console.error(uploadError);
          }
        );
    }
    }


  private uploadFilePPTX(): void {

    if (this.fileToUpload) {

      // Upload the file
      this.fileService.uploadFile(this.fileToUpload, this.brief.data.id, this.userId, Department['TALENT'])
        .subscribe(
          (data) => {
            // On successful upload, check if there's an existing presentation to delete
            if (this.presentationId != null) {
              this.fileService.deletePresentationFile(this.presentationId)
                .subscribe(
                  (deleteData) => {
                    this.toastrService.success('File uploaded and old presentation deleted successfully!');
                    // Instead of reloading, consider fetching data or updating the component's state as required
                    // For the sake of this example, I'll leave it commented out:
                    // this.fetchData(); or this.updateState();
                    this.childEvent.emit('event');
                  },
                  (deleteError) => {
                    this.toastrService.error('Error deleting old presentation!');
                    console.error(deleteError);
                  }
                );
            } else {
              this.toastrService.success('File uploaded successfully!');
              // Similar as above, consider updating state or fetching data
              // this.fetchData(); or this.updateState();
              this.childEvent.emit('event');
            }
          },
          (uploadError) => {
            this.toastrService.error('File upload error!');
            console.error(uploadError);
          }
        );
    } else {
      this.toastrService.error('Invalid file or wrong file type. Please upload a valid PPTX file.');
    }
  }

  private uploadFilePDF(): void {
    if (this.fileToUpload) {
      this.fileService.uploadFile(this.fileToUpload, this.brief.data.id, this.userId, Department['TALENT'])
      .subscribe(
        (data) => {
          // Assuming there's a similar method to delete old PDFs (replace this with actual method if different)
          if (this.pdfId != null) {
            this.fileService.deletePDFFile(this.pdfId)
              .subscribe(
                (deleteData) => {
                  this.toastrService.success('File uploaded and old PDF deleted successfully!');
                  // Instead of reloading, consider fetching data or updating the component's state as required
                  // For the sake of this example, I'll leave it commented out:
                  // this.fetchData(); or this.updateState();
                  this.childEvent.emit('event');
                },
                (deleteError) => {
                  this.toastrService.error('Error deleting old PDF!');
                  console.error(deleteError);
                }
              );
          } else {
            this.toastrService.success('File uploaded successfully!');
            // Similar as above, consider updating state or fetching data
            // this.fetchData(); or this.updateState();
            this.childEvent.emit('event');
          }
        },
        (uploadError) => {
          this.toastrService.error('File upload error!');
          console.error(uploadError);
        }
      );
  }
}

  public downloadFilePPTX(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;  // Set the desired filename here
      document.body.appendChild(a);  // Add to the DOM
      a.click();  // Trigger a click event to start the download
      document.body.removeChild(a);  // Clean up: remove the anchor from the DOM
      window.URL.revokeObjectURL(url);  // Clean up: release the object URL
    });
  }

  public downloadFilexlsx(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;  // Set the desired filename here
      document.body.appendChild(a);  // Add to the DOM
      a.click();  // Trigger a click event to start the download
      document.body.removeChild(a);  // Clean up: remove the anchor from the DOM
      window.URL.revokeObjectURL(url);  // Clean up: release the object URL
    });
  }

  public downloadFilePDF(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;  // Set the desired filename here
      document.body.appendChild(a);  // Add to the DOM
      a.click();  // Trigger a click event to start the download
      document.body.removeChild(a);  // Clean up: remove the anchor from the DOM
      window.URL.revokeObjectURL(url);  // Clean up: release the object URL
    });
  }


  public deleteBudgetSheetFile(id: number): void {

    this.dialogService.openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe(result => {
        if (result === true) {
          this.fileService.deleteBudgetSheetFile(id).subscribe(
            (data) => {
              this.toastrService.success('File deleted successfully!');

              this.budgetSheet = null;
              this.childEvent.emit('event');
            },
            (error) => {
              this.toastrService.error('File delete error!');
            }
          );
        }
      });
  }

  public deletePresentationFile(id: number): void {
    this.dialogService.openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe(result => {
        if (result === true) {
    this.fileService.deletePresentationFile(id).subscribe(
      (data) => {
        this.toastrService.success('File deleted successfully');

        this.presentation = null;
        this.childEvent.emit('event');
      },
      (error) => {
        this.toastrService.error('File delete error');
      }
    );
        }
      }
      );
  }

  public deletePDFFile(id: number): void {
    this.dialogService.openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe(result => {
        if (result === true) {
          this.fileService.deletePDFFile(id).subscribe(
            (data) => {
              this.toastrService.success('File deleted successfully');

              this.pdf = null;
              this.childEvent.emit('event');
            },
            (error) => {
              this.toastrService.error('File delete error');
            }
          );
        }
      });
  }
  private deactivateBrief(): void {
    this.salesService
      .changeStatus(this.brief_id, { status: 'InActive' })
      .subscribe((data1: any) => {
        this.toastrService.success('Brief Deactivated');

        this.taskService
          .deactivateTask(this.brief_id)
          .subscribe((data2: any) => {
            this.toastrService.success('Task Deactivated');
            window.location.reload();
          });
      });
  }

  protected chooseFile(): void {
const dialogRef =
    this.dialog?.open( MainTableComponent, {
      width: '90%',
      height: '90%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: this.id,
        task: this.task,
        userId: this.userId,
        brief: this.brief,
        budgetSheetId: this.budgetSheetId,
        presentationId: this.presentationId,
        assignedUser_id: this.assignedUser_id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.childEvent.emit('event');
      }
    });

  }
}
