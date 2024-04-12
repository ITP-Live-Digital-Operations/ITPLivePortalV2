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

  displayedColumns: string[] = ['originalname', 'fileType', 'action'];

  private getSalesFiles() {
    this.fileService.getSalesBriefFiles(this.briefId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  downloadFile(id: number, mimeType: string) {
    this.fileService.downloadFile(id).subscribe((data) => {
      const blob = new Blob([data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  
}
