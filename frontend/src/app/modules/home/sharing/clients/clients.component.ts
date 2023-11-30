import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/core/interfaces/client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { NewClientComponent } from './new-client/new-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  protected clients : any;
  protected displayedColumns = ['name', 'industry']
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  private loadClients() {
    this.clientService.getClients().subscribe((clients: ClientModel[]) => {
      this.clients = new MatTableDataSource(clients);
      this.clients.paginator = this.paginator;
      this.clients.sort = this.sort;
      console.log(this.clients);
    });
  }

  ngOnInit() {
    this.loadClients();
  }

  applyFilterChange(value: string): void {
    // Trim whitespace from the input and convert to lowercase for case-insensitive filtering
    const filterValue = value.trim().toLowerCase();

    // Assign the filter value to the MatTableDataSource's filter property
    // The MatTableDataSource will automatically handle the filtering
    this.clients.filter = filterValue;

    // If the paginator is used, it should be reset to the first page
    if (this.clients.paginator) {
      this.clients.paginator.firstPage();
    }
  }

  redirectToNewClient() {
    this.dialog?.open(NewClientComponent, {
      width: '80%',
      height: '65%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {

      },
    });
  }

}
