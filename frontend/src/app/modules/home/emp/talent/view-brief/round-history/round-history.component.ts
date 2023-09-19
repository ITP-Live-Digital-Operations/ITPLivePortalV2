import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskModel } from 'src/app/core/interfaces/task.Model';

@Component({
  selector: 'app-round-history',
  templateUrl: './round-history.component.html',
  styleUrls: ['./round-history.component.scss']
})
export class RoundHistoryComponent {

@Input()
task!: TaskModel;

public dataSource: any;

constructor() {

}

displayedColumns: string[] = ['round', 'feedback', 'notes', 'createdAt'];

@ViewChild(MatPaginator) paginator!: MatPaginator;

@ViewChild(MatSort) sort!: MatSort;

/* ngOnInit(): void {
  this.loadData();
} */

ngOnChanges(): void {
  this.loadData();
}

loadData(): void {

  this.dataSource = new MatTableDataSource(this?.task?.History);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

}

}
