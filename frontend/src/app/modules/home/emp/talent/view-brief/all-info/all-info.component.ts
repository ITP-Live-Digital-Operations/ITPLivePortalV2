import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PATH } from 'src/app/core/constant/routes.constants';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-all-info',
  templateUrl: './all-info.component.html',
  styleUrls: ['./all-info.component.scss'],
})
export class AllInfoComponent {
  panelOpenState = false;
displayedColumns: string[] = ['originalname', 'fileType', 'notes', 'action'];

  @Input()
  brief: any;

  briefId!: number;

  public path = PATH;
  public dataSource: any;

  constructor(
    private fileService: FileService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.briefId = params['id'];
    });

    this.getSalesFiles();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;



  private getSalesFiles() {
    this.fileService.getSalesBriefFiles(this.briefId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  downloadFile(fileId: number, fileName: string): void {
    this.fileService.downloadFile(fileId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        document.body.appendChild(link); // Append link to the document to ensure it works across all browsers
        link.style.display = 'none'; // Hide the link
        link.href = url;
        link.download = fileName; // Set the desired file name for download
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up by removing the link from the document
        window.URL.revokeObjectURL(url); // Free up memory by revoking the blob URL
      },
      error: (error) => console.error('Error downloading file:', error)
    });
  }

  openFile(id: number) {
    this.fileService.downloadFile(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      window.URL.revokeObjectURL(url);  // Optionally revoke the URL if needed
    });
  }


}
