import { Component, EventEmitter, Output } from '@angular/core';

import { FileWithProgress } from '../../../../core/interfaces/files.Model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent {
  @Output()
  filesUploaded = new EventEmitter<File[]>();

  constructor(private toastrService: ToastrService) {}
  files: FileWithProgress[] = [];

  allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.oasis.opendocument.presentation'
];


  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const fileArray: File[] = Array.from(input.files);
      this.prepareFilesList(fileArray);
    }
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    console.log(this.files);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 300);
      }
    }, 1000);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      if (item && this.allowedTypes.includes(item.type)) {
        this.files.push(item);

        this.filesUploaded.emit(this.files);
      } else {
        this.toastrService.error('File type not supported', 'Error');
      }
    }
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes: number, decimals: number = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
