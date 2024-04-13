import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/core/services/sales.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';

@Component({
  selector: 'app-all-briefs',
  templateUrl: './all-briefs.component.html',
  styleUrls: ['./all-briefs.component.scss'],
})
export class AllBriefsComponent {
  private path = PATH;
  private briefDetails: any;
  public dataSource: any;
  private users: any = {};
  private id: any;
  public userRole: string = this.userService.getRole();
  public privilegeLevel: number = this.userService.getPrivilegeLevel();
  public userId: number = this.userService.getID();

  displayedColumns = [
    'Agency',
    'Client',
    'CampaignName',
    'CreatedDate',
    'AssignedDate',
    'TaskDeadline',
    'Status',
    'Sales',
    'Talent',
    'Action',
  ];

  filterCriteria: any = {
    /* search: '', */
    location: [],
  };

  displayedColumns1: string[] = ['color', 'meaning'];
  colorLegend = [
    { color: 'none', meaning: 'All' },
    { color: 'green', meaning: 'Not Assigned' },
    { color: 'blue', meaning: 'Assigned' },
    { color: 'red', meaning: 'In Active' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private salesService: SalesService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private dialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.getAllBriefs();

    this.userService.getAllUsers().subscribe((data) => {
      data.forEach((user) => {
        this.users[user.id] = user.name;
      });
    });
  }

  private getAllBriefs(): void {
    this.salesService.getAllBriefsWithTaskAndUser().subscribe((data: any) => {
      console.log(data);
      this.briefDetails = data;
      this.briefDetails.data.sort((a: any, b: any) => {
        // Sort by createdAt
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;

        // If createdAt is equal, sort by priority
        return a.Priority - b.Priority;
      });

      this.dataSource = new MatTableDataSource(this.briefDetails.data);
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        // This assumes that each data row has a 'Status' property.
        if (filter === 'Not Assigned') {
          return data.assigned == 0;
        }
        if (filter === 'Active') {
          return data.Status === filter && data.assigned == 1;
        }
        if (filter === 'all') {
          return true;
        }
        return data.Status === filter;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.salesService
        .getSalesBriefWithFiles(this.id)
        .subscribe((data: any) => {});
    });
  }

  public viewedTask(id: number): void {
    this.salesService.viewedByTalent(id).subscribe((data: any) => {});
    if (this.userRole == 'sales') {
      this.router.navigate([`${this.path['viewBriefSales'] + id}`]);
    } else {
      this.router.navigate([`${this.path['viewBrief'] + id}`]);
    }
  }

  public drop(event: CdkDragDrop<string[]>): void {
    {
      moveItemInArray(
        this.dataSource.data,
        event.previousIndex,
        event.currentIndex
      );

      const updatedPriorities = this.dataSource.data.map(
        (item: any, index: any) => {
          return { id: item.id, newPriority: index + 1 };
        }
      );

      this.salesService.updatePriorities(updatedPriorities).subscribe(
        (response) => {
          setTimeout(() => {
            window.location.reload();
          }, 200);
        },
        (error) => {
          console.error('Error updating priorities:', error);
        }
      );
    }
  }

  public deleteBrief(inputdata: any): void {
    this.dialogService
      .openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe((result) => {
        if (result === true) {
          this.salesService.deleteBrief(inputdata).subscribe(() => {
            this.toastrService.success('Deleted Successfully!');
            this.getAllBriefs();
          });
        }
      });
  }

  applyFilterColor(color: string) {
    if (color === 'green') {
      this.dataSource.filter = 'Not Assigned';
    } else if (color === 'blue') {
      this.dataSource.filter = 'Active';
    } else if (color === 'red') {
      this.dataSource.filter = 'InActive';
    } else if (color === 'none') {
      this.dataSource.filter = 'all';
    }
  }

  applyFilterChange(filterType: string, filterValue: any): void {
    switch (filterType) {
      case 'search':
        this.filterCriteria.search = filterValue.trim().toLowerCase();
        break;
      case 'location':
        this.filterCriteria.location = filterValue.map((val: string) =>
          val.trim()
        );
        break;
      default:
        break;
    }
    if (!Array.isArray(filterValue)) {
      filterValue = [filterValue];
    }

    this.filterCriteria[filterType] = filterValue.map((val: string) =>
      val.trim()
    );
    this.applyFilter();
  }

  public applyFilter(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      console.log(filter);
      const filterObject = JSON.parse(filter);

      /* const isMatchSearch = filterObject.search ? data.Agency.toLowerCase().includes(filterObject.search) ||
        data.Client.toLowerCase().includes(filterObject.search) ||
        data.CampaignName.toLowerCase().includes(filterObject.search) : true; */

      const isMatchLocation = !this.filterCriteria.location.length ||
        filterObject.location.includes(
            data.user.location
          );

      return isMatchLocation;
    };

    this.dataSource.filter = JSON.stringify(this.filterCriteria);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.updateFilterDropDowns();
  }

  updateFilterDropDowns(): void {}

  public getUsername(id: number): string {
    return this.users[id] || 'Not Assigned';
  }
}
