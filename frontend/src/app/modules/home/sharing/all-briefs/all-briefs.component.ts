import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/core/services/sales.service';
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
  public uniqueLocations: string[] = [];

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
    location: [],
    meaning: 'All'
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
      this.extractUniqueLocations();
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
      this.dataSource.sortingDataAccessor = (item : any, property: any) => {
        const value = this.getPropertyValue(item, property);
    if (value === null || value === undefined || value === '') {
      // Returning a high value to ensure empty or null values go to the end when sorting
      return Number.MAX_SAFE_INTEGER;
    }
    return value;
  };
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
    });

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.salesService
        .getSalesBriefWithFiles(this.id)
        .subscribe((data: any) => {});
    });
  }

  private getPropertyValue(item: any, property: string): any {
    switch (property) {
      case 'Client': return item.client?.name;
      case 'Sales': return item.user.name;
      case 'Talent': return item.task?.assignedUsers[0]?.name;
      case 'CreatedDate': return new Date(item.createdAt ?? item.task?.createdAt);
      case 'AssignedDate': return item.task ? new Date(item.task.createdAt) : null;
      case 'TaskDeadline': return item.task ? new Date(item.task.deadline) : null;
      default: return item[property];
    }
  }

  private extractUniqueLocations(): void {
    const locationSet = new Set<string>();
    this.briefDetails.data.forEach((item: any) => {
      if (item.user && item.user.location) {
        locationSet.add(item.user.location);
      }
    });
    this.uniqueLocations = Array.from(locationSet);
  }
  public viewedTask(id: number): void {
    this.salesService.viewedByTalent(id).subscribe((data: any) => {});
    if (this.userRole == 'sales') {
      this.router.navigate([`${this.path['viewBriefSales'] + id}`]);
    } else {
      this.router.navigate([`${this.path['viewBrief'] + id}`]);
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
    if (!Array.isArray(filterValue)) {
      filterValue = [filterValue];
    }
    this.filterCriteria[filterType] = filterValue.map((val: string) => val.trim());
    this.updateMeaningOptions(this.filterCriteria.location); // Call to update color meanings based on selected locations
    this.applyFilter();
  }

updateMeaningOptions(selectedLocations: string[]): void {
    if (!selectedLocations.length) {
        this.colorLegend = [
            { color: 'none', meaning: 'All' },
            { color: 'green', meaning: 'Not Assigned' },
            { color: 'blue', meaning: 'Assigned' },
            { color: 'red', meaning: 'In Active' },
        ];
    } else {
        // Filter colorLegend based on the logic that ties locations to meanings
        this.colorLegend = this.colorLegend.filter(item => {
            // Call a service or use a dictionary to determine if the meaning is valid for the selected locations
            return this.isValidMeaningForLocations(item.meaning, selectedLocations);
        });
    }
}

isValidMeaningForLocations(meaning: string, locations: string[]): boolean {
    // Implement your logic to determine if a meaning is valid for the selected locations
    // This is just a placeholder function
    return true; // Replace with actual logic
}
public applyFilter(): void {
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    const filterObject = JSON.parse(filter);

    const isMatchLocation = !filterObject.location.length ||
      filterObject.location.includes(data.user.location);

    const isMatchMeaning = filterObject.meaning === 'All' ||
      (filterObject.meaning === 'Not Assigned' && data.assigned === 0) ||
      (filterObject.meaning === 'Assigned' && data.assigned === 1 && data.Status === 'Active') ||
      (filterObject.meaning === 'In Active' && data.Status === 'InActive');

    return isMatchLocation && isMatchMeaning;
  };

  this.dataSource.filter = JSON.stringify(this.filterCriteria);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  updateFilterDropDowns(): void {}

  public getUsername(id: number): string {
    return this.users[id] || 'Not Assigned';
  }

}
