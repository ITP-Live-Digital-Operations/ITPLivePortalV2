import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import { CelebrityService } from 'src/app/core/services/celebrity.service';
import { EditCelebrityComponent } from '../../edit/edit-celebrity/edit-celebrity.component';
import { CelebrityIdComponent } from '../celebrity-id/celebrity-id.component';

@Component({
  selector: 'app-celebrities-list',
  templateUrl: './celebrities-list.component.html',
  styleUrls: ['./celebrities-list.component.scss'],
})
export class CelebritiesListComponent {
  dataSource: any;
  UserDetails: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CelebrityService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllCelebrities();
  }

  GetAllCelebrities() {
    this.service.getCelebrities().subscribe((item) => {
      this.UserDetails = item;
      this.dataSource = new MatTableDataSource<InfluencerModel>(
        this.UserDetails
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // deleteCelebrity(inputdata: any) {
  //   alertify.confirm(
  //     'Remove User',
  //     'Do you want to remove this celebrity ?',
  //     () => {
  //       this.service.deleteCelebrity(inputdata).subscribe((item) => {
  //         this.GetAllCelebrities();
  //         alertify.success('Celebrity Deleted.');
  //       });
  //     },
  //     function () {}
  //   );
  // }

  editCelebrity(inputdata: any) {
    this.dialog.open(EditCelebrityComponent, {
      width: '80%',
      height: '70%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }

  viewCelebrity(inputdata: any) {
    this.dialog.open(CelebrityIdComponent, {
      width: '80%',
      height: '70%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }

  displayedColumns: string[] = [
    'ID',
    'Name',
    'Gender',
    'InstagramHandle',
    'InstagramFollowers',
    'CountryLocation',
    'MainVertical',
    'Action',
  ];
}
