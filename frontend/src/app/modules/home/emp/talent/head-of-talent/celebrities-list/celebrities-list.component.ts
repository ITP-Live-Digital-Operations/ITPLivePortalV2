import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import { CelebrityService } from 'src/app/core/services/celebrity.service';
import { EditCelebrityComponent } from '../../edit/edit-celebrity/edit-celebrity.component';
import { CelebrityIdComponent } from '../celebrity-id/celebrity-id.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';

@Component({
  selector: 'app-celebrities-list',
  templateUrl: './celebrities-list.component.html',
  styleUrls: ['./celebrities-list.component.scss'],
})
export class CelebritiesListComponent {

  public dataSource: any;
  public UserDetails: any;



  public userRole = this.userService.getRole();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'Name',
    'InstagramFollowers',
    'TiktokFollowers',
    'TwitterFollowers',
    'YoutubeFollowers',
    'CountryLocation',
    'MainVertical',
    'Game',
    'Action',
  ];

  constructor(
    private service: CelebrityService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private userService: UserService,
    private dialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.GetAllCelebrities();
  }

  private GetAllCelebrities(): void {
    this.service.getCelebrities().subscribe((item) => {
      this.UserDetails = item;
      this.dataSource = new MatTableDataSource<InfluencerModel>(
        this.UserDetails
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteCelebrity(inputdata: any): void {
    this.dialogService.openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe(result => {
        if (result === true) {
          this.toastrService.success('Deleted Successfully!');
          this.service.deleteCelebrity(inputdata).subscribe((item) => {
            this.GetAllCelebrities();
          });
        }
      });
  }

  public editCelebrity(inputdata: any): void {
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

  public viewCelebrity(inputdata: any): void {
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

  public openLink(link: string): void {
    if (!link) {
      return;
    }
    window.open(link, '_blank');
  }
}
