import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/core/services/sales.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/core/services/user.service';
import { TaskModel } from 'src/app/core/interfaces/task.Model';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-all-briefs',
  templateUrl: './all-briefs.component.html',
  styleUrls: ['./all-briefs.component.scss'],
})
export class AllBriefsComponent {
  briefDetails: any;
  dataSource: any;
  users: any = {};


  id: any;
  task!: TaskModel;

  assignedUser!: String;

  userRole: string = '';
  privilegeLevel: number = this.userService.getPrivilegeLevel();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private salesService: SalesService,
    private userService: UserService,
    private route: Router,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userRole = this.userService.getRole();
  }

  ngOnInit(): void {
    this.getAllBriefs();

    this.userService.getAllUsers().subscribe(data => {
      data.forEach(user => {
        this.users[user.id] = user.name;  // Assuming the user object has 'id' and 'name' properties
      });
    });
  }

  displayedColumns: string[] = [
    'Status',
    'CampaignName',
    'Agency',
    'Client',
    'CampaignObjective',
    'CampaignStartDate',
    'Priority',
    'ViewedByTalent',
    'SubmittedBy',
    'AssignedTo',
    'Action',
  ];

  getAllBriefs() {
    this.salesService.getAllBriefsWithTask().subscribe((data: any) => {
      this.briefDetails = data;
      this.briefDetails.data.sort((a: any, b: any) => {
        if (a.Status === 'InActive' && b.Status !== 'InActive') return 1;
        if (b.Status === 'InActive' && a.Status !== 'InActive') return -1;

        // If statuses are different, sort by status
        if (a.Status !== b.Status) return a.Status.localeCompare(b.Status);

        // If statuses are the same, sort by priority
        return a.Priority - b.Priority;
      });
      // Re-adjust the priorities based on the sorted order and prepare the update data
      const updatedPriorities = this.briefDetails.data.map(
        (item: any, index: number) => {
          return { id: item.id, newPriority: index + 1 };
        }
      );

      // Send updated priorities to the backend
      this.salesService.updatePriorities(updatedPriorities).subscribe();

      this.dataSource = new MatTableDataSource(this.briefDetails.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.salesService
        .getSalesBriefWithFiles(this.id)
        .subscribe((data: any) => {
          this.taskService.getTaskByBriefId(this.id).subscribe((data: any) => {
            this.task = data.data[0];

          });
        });
    });
  }

  viewedTask(id: any) {
    this.salesService.viewedByTalent(id).subscribe((data: any) => {});
    if (this.userRole == 'sales') {
      this.route.navigate([`home/sales/sentBriefs/${id}`]);
    } else {
      this.route.navigate([`home/talent/viewBrief/${id}`]);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
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

  getUsername(id: number){
    return this.users[id] || 'Not Assigned';
  }

}
