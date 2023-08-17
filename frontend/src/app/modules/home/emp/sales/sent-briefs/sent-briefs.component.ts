import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/core/services/sales.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sent-briefs',
  templateUrl: './sent-briefs.component.html',
  styleUrls: ['./sent-briefs.component.scss'],
})
export class SentBriefsComponent {
  dataSource: any;
  user_id = this.userService.getID();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private salesService: SalesService,
  ) {}

  ngOnInit(): void {
    this.getSentBriefs();
  }

  getSentBriefs() {
    this.salesService.viewMyBriefs(this.user_id).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    'CampaignName',
    'Agency',
    'Client',
    'CreatedAt',
    'UpdatedAt',
    'Action',
  ];
}
