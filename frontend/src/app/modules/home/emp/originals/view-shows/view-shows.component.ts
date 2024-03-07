import { Component, HostListener, ViewChild } from '@angular/core';
import { OgService } from 'src/app/core/Services/og.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  ogShow,
  ogShowCreate,
  ogShowEdit,
} from 'src/app/core/interfaces/og.model';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { response } from 'express';
import { UserService } from 'src/app/core/services/user.service';
import { EditShowsComponent } from '../edit-shows/edit-shows.component';

@Component({
  selector: 'app-view-shows',
  templateUrl: './view-shows.component.html',
  styleUrls: ['./view-shows.component.scss'],
})
export class ViewShowsComponent {

  public dataSource: any;
  public showEditColumn: boolean = true;
  private ogShowDetails: any;
  public id: string[] = [];
  public name: string[] = [];
  public description: string[] = [];
  public color: string[] = [];
  public colorCode: string[] = [];

  constructor(
    private dialogService: ConfirmationDialogService,
    private ogService: OgService,
    private dialog: MatDialog,
    private toasterService: ToastrService,
    private userService: UserService
  ) {}

  displayedColumns: string[] = [
    'name',
    'description',
    'color',
    'colorCode',
  ];

;

  public userRole = this.userService.getRole();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit(): void {
    this.getShows();
    this.toggleEditColumn();
  }

  public editShows(inputdata: any): void {
    const dialogRef = this.dialog?.open(EditShowsComponent, {
      width: '90%',
      height: '80%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });

    dialogRef.afterClosed().subscribe( result => {
      this.getShows()
    })
  }

  private getShows(): void {
    this.ogService.getOgShows().subscribe((response: ogShow[]) => {
      this.ogShowDetails = response;
      this.dataSource = new MatTableDataSource<ogShow[]>(this.ogShowDetails);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 1);
    });
  }

  public toggleEditColumn(): void {
    this.showEditColumn = !this.showEditColumn;
    if(this.showEditColumn) {
      this.displayedColumns.push('edit');
    } else {
      if(this.displayedColumns.length > 4) {
        this.displayedColumns.pop();
      }
    }
  }

  public editShow(): void {
    throw new Error('Method not implemented.');
  }
}
