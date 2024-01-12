import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  CampaignModel,
  campaignFileModel,
} from 'src/app/core/interfaces/campaign.model';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'app-campaign-files',
  templateUrl: './campaign-files.component.html',
  styleUrls: ['./campaign-files.component.scss'],
})
export class CampaignFilesComponent {
  @Input()
  campaign!: CampaignModel;

  type!: string;
  campaignFiles: campaignFileModel[];

  displayedColumns: string[] = [
    'fileName',
    'fileType',
    'fileSizeMB',
    'uploadedBy',
    'createdAt',
    'download',
  ];
  dataSource!: MatTableDataSource<campaignFileModel>;

  constructor(private campaignService: CampaignService) {
    this.campaignFiles = this.campaign?.campaignFiles;

    const files: campaignFileModel[] = this.campaignFiles;
    this.dataSource = new MatTableDataSource(files);
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.campaignFiles = this.campaign?.campaignFiles;
    const files: campaignFileModel[] = this.campaignFiles;
    this.dataSource = new MatTableDataSource(files);
  }

  convertToMB(bytes: number): number {
    return bytes / 1024 / 1024;
  }

  truncateFilename(name: string): string {
    const maxLength = 20; // Define max length
    return name.length > maxLength ? name.substr(0, maxLength - 1) + '…' : name;
  }

  // Method to handle download
  downloadFile(id: number, file: campaignFileModel): void {
    this.campaignService.downloadCampaignFile(id).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], { type: file.mimeType })
        );
        const link = document.createElement('a');
        link.href = url;
        link.download = file.fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading the file:', error);
      }
    );
  }
}
