import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/core/services/sales.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-ready-briefs',
  templateUrl: './ready-briefs.component.html',
  styleUrls: ['./ready-briefs.component.scss'],
})
export class ReadyBriefsComponent {
  dataSource: any;
  briefs: any;
  user_id = this.userService.getID();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private salesService: SalesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getReadyBriefs();
  }

  displayedColumns: string[] = [
    'CampaignName',
    'Agency',
    'Client',
    'CreatedAt',
    'UpdatedAt',
    'Action',
  ];

  getReadyBriefs() {
    this.salesService
      .getBriefByCreatedbyId(this.user_id)
      .subscribe((res: any) => {
        this.briefs = res;
        this.dataSource = new MatTableDataSource(this.briefs.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  viewFiles(id: any) {
    this.salesService.viewBriefBySales(id).subscribe((res: any) => {});
    this.router.navigate([`/home/sales/readyBriefs/${id}`]);
  }
}
