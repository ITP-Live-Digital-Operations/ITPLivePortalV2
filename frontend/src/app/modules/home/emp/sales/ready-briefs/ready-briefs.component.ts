import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/core/services/sales.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-ready-briefs',
  templateUrl: './ready-briefs.component.html',
  styleUrls: ['./ready-briefs.component.scss'],
})
export class ReadyBriefsComponent {

  public path = PATH;
  public dataSource: any;
  private briefs: any;
  private user_id = this.userService.getID();

  displayedColumns: string[] = [
    'CampaignName',
    'Agency',
    'Client',
    'CreatedAt',
    'UpdatedAt',
    'Action',
  ];

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

  private getReadyBriefs(): void {
    this.salesService
      .getBriefByCreatedbyId(this.user_id)
      .subscribe((res: any) => {
        this.briefs = res;
        this.dataSource = new MatTableDataSource(this.briefs.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public viewFiles(id: number): void {
    this.salesService.viewBriefBySales(id).subscribe((res: any) => {});
    this.router.navigate([`${this.path['readyBriefs'] + id}`]);
  }
}
