import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{


  users: any;
  dataSource: any;


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort !: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();

  }


  getUsers() {
      this.userService.getAllUsers().subscribe( (response ) => {
        this.users = response;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
  )
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

onPageChange(event: any){
  this.getUsers();
}

newUser() {
  this.router.navigate(['home/admin/register-user'])
}

displayedColumns: string[] = ['id', 'name', 'email', 'role', 'privilege_level'];

onRowClicked(row: any) {
  this.router.navigate([`home/admin/edit-user/${row.id}`])
}

backButton() {
    window.history.back();
  }
}
