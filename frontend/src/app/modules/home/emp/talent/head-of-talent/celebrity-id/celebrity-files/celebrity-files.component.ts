import { Component, Input, OnInit } from '@angular/core';
import { CelebrityService } from 'src/app/core/services/celebrity.service';

@Component({
  selector: 'app-celebrity-files',
  templateUrl: './celebrity-files.component.html',
  styleUrls: ['./celebrity-files.component.scss']
})
export class CelebrityFilesComponent implements OnInit {
  @Input() celebrityId!: number;
  celebrityFiles: any[] = []; // Consider defining a more specific type
  selectedFile: File | null = null;

  constructor(private celebrityService: CelebrityService) {}

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
    this.selectedFile = target.files ? target.files[0] : null;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.celebrityService.uploadCelebrityFile(this.selectedFile, this.celebrityId).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          this.getCelebrityFiles(); // Refresh list
          this.selectedFile = null; // Reset selection
        },
        error: (error) => console.error('Error uploading file:', error)
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

  deleteFile(fileId: number): void {
    this.celebrityService.deleteCelebrityFile(fileId).subscribe({
      next: (response) => {
        console.log('File deleted successfully:', response);
        this.getCelebrityFiles(); // Refresh list
      },
      error: (error) => console.error('Error deleting file:', error)
    });
  }
}
