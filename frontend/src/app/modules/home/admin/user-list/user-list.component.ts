import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  public path = PATH;
  private users: any;
  public dataSource: any;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'privilege_level',
    'loginCount',
    'view',
    'action',
  ];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private userService: UserService,
    private dialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: number): void {
    this.dialogService
      .openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe((result) => {
        if (result === true) {
          this.userService.deleteUser(id).subscribe((response) => {
            this.getUsers();
          });
        }
      });
  }
}
