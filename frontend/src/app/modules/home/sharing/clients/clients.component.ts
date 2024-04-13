import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/core/interfaces/client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { NewClientComponent } from './new-client/new-client.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { EditClientComponent } from './edit-client/edit-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  protected clients: any;
  public isLoading = true;
  protected clientName: string[] = [];
  protected clientIndustry: string[] = [];

  protected displayedColumns = ['name', 'industry', 'action'];

  protected filterValues = {
    clientName: '',
    clientIndustry: '',
  };

  filteredClientName: string[] = [];
  filteredClientIndustry: string[] = [];

  selectedClientName: string = '';
  selectedClientIndustry: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadClients();

    this.filteredClientName = this.clientName;
    this.filteredClientIndustry = this.clientIndustry;
  }

  private loadClients() {
    this.isLoading = true;
    this.clientService.getClients().subscribe((clients: ClientModel[]) => {
      this.clients = new MatTableDataSource(clients);
      this.clients.paginator = this.paginator!;
      this.clients.sort = this.sort;
      this.isLoading = false;
      // Extract unique values from columns to build filter
      this.clientName = [
        ...new Set(clients.map((result: any) => result.name)),
      ].sort() as string[];

      this.clientIndustry = [
        ...new Set(clients.map((result: any) => result.industry)),
      ].sort() as string[];
    });
  }

  searchClients(searchTerm: string) {
    if (searchTerm) {
      this.filteredClientName = this.clientName.filter((client) =>
        client.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filterClientName(searchTerm.toLowerCase());
    } else {
      this.filteredClientName = this.clientName;
      this.filterClientName(searchTerm.toLowerCase());
    }
  }

  searchIndustry(searchTerm: string) {
    if (searchTerm) {
      this.filteredClientIndustry = this.clientIndustry.filter((client) =>
        client.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filterClientIndustry(searchTerm.toLowerCase());
    } else {
      this.filteredClientIndustry = this.clientIndustry;
      this.filterClientIndustry(searchTerm.toLowerCase());
    }
  }

  onClientNameSelect(event: MatAutocompleteSelectedEvent) {
    this.selectedClientName = event.option.value;
    this.filterClientName(this.selectedClientName.toLowerCase());
  }

  onClientIndustrySelect(event: MatAutocompleteSelectedEvent) {
    this.selectedClientIndustry = event.option.value;
    this.filterClientIndustry(this.selectedClientIndustry.toLowerCase());
  }

  public applyFilter() {
    this.clients.filterPredicate = (data: ClientModel, filter: string) => {
      const searchString = JSON.parse(filter);

      const clientNameMatch = searchString.clientName
        ? data.name
            .toLowerCase()
            .includes(searchString.clientName.toLowerCase())
        : true;
      const clientIndustryMatch = searchString.clientIndustry
        ? data.industry
            .toLowerCase()
            .includes(searchString.clientIndustry.toLowerCase())
        : true;

      return clientNameMatch && clientIndustryMatch;
    };
    this.clients.filter = JSON.stringify(this.filterValues);
  }

  public filterClientName(clientName: string) {
    this.filterValues.clientName = clientName;
    this.applyFilter();
    this.updateFilterOptions();
  }

  public filterClientIndustry(clientIndustry: string) {
    this.filterValues.clientIndustry = clientIndustry;
    this.applyFilter();
    this.updateFilterOptions();
  }

  private updateFilterOptions() {
    const renderedData = this.clients.filteredData || [];

    this.clientName = [
      ...new Set(renderedData.map((result: any) => result.name)),
    ].sort() as string[];

    this.clientIndustry = [
      ...new Set(renderedData.map((result: any) => result.industry)),
    ].sort() as string[];
  }

  viewClient(id: number) {
    this.dialog
      ?.open(EditClientComponent, {
        width: '800px',
        height: 'auto',
        exitAnimationDuration: '1000ms',
        enterAnimationDuration: '1000ms',
        data: { id: id, source: 'clients' },
      })
      .afterClosed()
      .subscribe(() => {});
  }

  redirectToNewClient() {
    this.dialog
      ?.open(NewClientComponent, {
        width: '80%',
        height: '65%',
        exitAnimationDuration: '1000ms',
        enterAnimationDuration: '1000ms',
        data: {},
      })
      .afterClosed()
      .subscribe(() => {
        this.loadClients();
      });
  }
}
