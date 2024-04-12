import { Component, Input, OnInit } from '@angular/core';
import { CelebrityService } from 'src/app/core/services/celebrity.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';

@Component({
  selector: 'app-celebrity-files',
  templateUrl: './celebrity-files.component.html',
  styleUrls: ['./celebrity-files.component.scss']
})
export class CelebrityFilesComponent implements OnInit {
  @Input() celebrityId!: number;
  celebrityFiles: any[] = []; // Consider defining a more specific type
  selectedFile: File | null = null;
  isLoading: boolean = false; 
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>; 
  constructor(private celebrityService: CelebrityService,
    private dialog: MatDialog,
    private dialogService: ConfirmationDialogService,
    private toastrService: ToastrService  
  ) {}

  ngOnInit() {
    this.getCelebrityFiles();
  }

  getCelebrityFiles(): void {
    this.celebrityService.getCelebrityFiles(this.celebrityId).subscribe({
      next: (response) => {
        if (response instanceof ArrayBuffer) {
          const decoder = new TextDecoder('utf-8');
          const decodedString = decoder.decode(response);
          try {
            this.celebrityFiles = JSON.parse(decodedString);
            this.dataSource = new MatTableDataSource(this.celebrityFiles);
            this.dataSource.paginator = this.paginator;
          } catch (error) {
            console.error('Failed to parse JSON from ArrayBuffer', error);
          }
        } else {
          // Handle non-ArrayBuffer responses if necessary
          this.celebrityFiles = response;
        }
      },
      error: (error) => console.error('Error fetching celebrity files:', error)
    });
  }
  
  transformFilename(originalFilename: string): string {
    // Split the filename by hyphen, remove the first part, and then join back
    const parts = originalFilename.split('-');
    if (parts.length > 1) {
      // Remove the first part which is the number and the hyphen
      parts.shift();
      return parts.join('-').trim(); // Join the remaining parts back with hyphen
    }
    return originalFilename; // Return the original name if no hyphen is found
  }
  
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      const validTypes = ['pdf', 'ppt','pptx', 'docx'];
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension && validTypes.includes(extension)) {
        this.selectedFile = file;
      } else {
        this.toastrService.error('Please upload a file of type PDF, PPT, or DOCX.', 'Invalid File Type');
        this.selectedFile = null; // Reset the file input
      }
    }
  }
  

  uploadFile(): void {
    if (this.selectedFile) {
      this.isLoading = true; // Start loading
      this.celebrityService.uploadCelebrityFile(this.selectedFile, this.celebrityId).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          this.getCelebrityFiles(); // Refresh list
        },
        error: (error) => {
          console.error('Error uploading file:', error);
        },
        complete: () => {
          this.isLoading = false; // Stop loading regardless of success or error
          this.selectedFile = null; // Reset selection
        }
      });
    }
  }

  downloadFile(fileId: number, fileName: string): void {
    this.celebrityService.downloadCelebrityFile(fileId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => console.error('Error downloading file:', error)
    });
  }
  openFile(fileId: number, fileName: string): void {
    this.celebrityService.downloadCelebrityFile(fileId).subscribe({
      next: (blob) => {
        // Instead of triggering a download, create a blob URL and open it in a new tab.
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        // Note: No need to revoke the URL here, as it should remain accessible in the new tab.
      },
      error: (error) => console.error('Error opening file:', error)
    });
  }
  
  deleteFile(fileId: number): void {
    this.dialogService.openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe((result) => {
        if (result === true) {
          this.celebrityService.deleteCelebrityFile(fileId).subscribe({
            next: (response) => {
              this.toastrService.success('File deleted successfully!');
              this.getCelebrityFiles(); // Refresh the file list
            },
            error: (error) => {
              this.toastrService.error('Error deleting file:', error.message);
            }
          });
        }
      });
  }
}
