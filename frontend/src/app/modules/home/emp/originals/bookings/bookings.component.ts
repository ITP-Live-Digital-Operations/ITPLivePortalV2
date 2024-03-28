import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { OgService } from 'src/app/core/Services/og.service';
import { ogBookings } from 'src/app/core/interfaces/og.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  dataSource!: MatTableDataSource<ogBookings>;
  displayedColumns: string[] = [
    'shootName',
    'showName',
    'team',
    'numberOfGuests',
    'startingDate',
    'endingDate',
    'progress'
  ];
  filterCriteria: any = {
    search: '',
    shootName: [],
    showName: [],
    team: [],
  };
  filterValues = {
    shootName: '',
    showName: '',
    team: '',
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('ShootNameSelect') ShootNameSelect!: MatSelect;
  @ViewChild('ShowNameSelect') ShowNameSelect!: MatSelect;
  @ViewChild('TeamSelect') TeamSelect!: MatSelect;
  constructor(private OgService: OgService) { }

  ngOnInit(): void {
    this.fetchData();
  }
  public allShowName: string[] = [];
  public allShootName: string[] = [];
  public allteam: string[] = [];
  public applyFilterChange(filterType: string, filterValue: any): void {
    console.log(`Filter change - Type: ${filterType}, Value: ${filterValue}`);

    switch (filterType) {
      case 'shootName':
        this.filterCriteria.shootName = filterValue.map((val: any) =>
          typeof val === 'string' ? val.trim().toLowerCase() : val
        );
        break;
      case 'showName':
        this.filterCriteria.showName = filterValue.map((val: any) =>
          typeof val === 'string' ? val.trim().toLowerCase() : val
        );
        break;
      case 'team':
        this.filterCriteria.team = filterValue.map((val: any) =>
          typeof val === 'string' ? val.trim().toLowerCase() : val
        );
        break;
      default:
        break;
    }

    if (!Array.isArray(filterValue)) {
      filterValue = [filterValue];
    }

    this.filterCriteria[filterType] = filterValue.map((val: any) =>
      typeof val === 'string' ? val.trim().toLowerCase() : val
    );
    this.applyFilter();
    this.updateFilterOptions();

  }
  public filterShootName(shootName: string): void {
    this.filterValues.shootName = shootName;
    this.applyFilter();
    this.updateFilterOptions();
  }

  public filterShowName(showname: string): void {
    this.filterValues.showName = showname;
    this.applyFilter();
    this.updateFilterOptions();
  }

  public filterteam(team: string): void {
    this.filterValues.team = team;
    this.applyFilter();
    this.updateFilterOptions();
  }
  
  public applyFilter(): void {
    console.log('Applying filter:', this.filterCriteria);
    
    const searchString = this.filterCriteria.search
      ? this.filterCriteria.search.toString().toLowerCase()
      : '';
    
    this.dataSource.filterPredicate = (
      data: ogBookings,
      filter: string
    ): boolean => {
      try {
        const filterObject = JSON.parse(filter);
        
        const isMatchSearch =
          !searchString ||
          data.shootName.toLowerCase().includes(searchString) ||
          (data.ogshow && data.ogshow.name.toLowerCase().includes(searchString)) ||  
          data.team.toLowerCase().includes(searchString);
  
        const isMatchShootName =
          !filterObject.shootName.length ||
          filterObject.shootName.includes(
            data.shootName.trim().toLowerCase()
          );
  
        const isMatchShowName =
          !filterObject.showName.length ||
          (data.ogshow && filterObject.showName.includes(
            data.ogshow.name.trim().toLowerCase()
          ));
  
        const isMatchTeam =
          !filterObject.team.length ||
          filterObject.team.includes(
            data.team.trim().toLowerCase()
          );
  
        return isMatchSearch && isMatchShootName && isMatchShowName && isMatchTeam;
      } catch (error) {
        console.error('Error parsing filter JSON:', error);
        return false;
      }
    };
    
    this.dataSource.filter = JSON.stringify(this.filterCriteria);
    this.updateFilterOptions();
  }
  
  
  private updateFilterOptions(): void {
    // Use a copy of the full data set as the starting point for filtering
    let baseFilteredData = [...this.dataSource.data];
  
    // Dynamically update options for each filter based on current filterCriteria
    // Note: It's important to maintain the integrity of each "all" array to allow for multiple selections
  
    // Filter for Influencers options based on all criteria except influencer itself
    this.allShootName = this.extractUniqueAttributes(
      baseFilteredData.filter(
        (data) =>
          (!this.filterCriteria.showName?.length ||
            this.filterCriteria.showName?.includes(
              data.ogshow.name?.trim().toLowerCase()
            )) &&
          (!this.filterCriteria.team?.length ||
            this.filterCriteria.team?.includes(
              data.team?.trim().toLowerCase()
            ))
      ),
      'shootName'
    );
    
  
    this.allShowName = this.extractUniqueAttributes(
      baseFilteredData.filter(
        (data) =>
          (!this.filterCriteria.shootName?.length ||
            this.filterCriteria.shootName?.includes(
              data.shootName?.trim().toLowerCase()
            )) &&
          (!this.filterCriteria.team?.length ||
            this.filterCriteria.team?.includes(
              data.team?.trim().toLowerCase()
            )) &&
          typeof data.ogshow?.name === 'string'
      ),
      'ogshow.name'
    );
    
    // Filter for Contacts options based on all criteria except contact itself
    this.allteam = this.extractUniqueAttributes(
      baseFilteredData.filter(
        (data) =>
          (!this.filterCriteria.shootName?.length ||
            this.filterCriteria.shootName?.includes(
              data.shootName?.trim().toLowerCase()
            )) &&
          (!this.filterCriteria.showName?.length ||
            this.filterCriteria.showName?.includes(
              data.ogshow?.name?.trim().toLowerCase()
            ))
      ),
      'team' // Make sure this is the correct attribute path for the 'user' name
    );
    
  }
  public resetFilters(): void {
    // Reset filter criteria
    this.filterCriteria ={
      search: '',
      shootName: [],
      showName: [],
      team: [],
    };

    this.allShootName = this.extractUniqueAttributes(
      this.dataSource.data,
      'shootName'
    );
    this.allShowName = this.extractUniqueAttributes(
      this.dataSource.data,
      'ogshow.name'
    );
    this.allteam = this.extractUniqueAttributes(
      this.dataSource.data,
      'team'
    );

    this.resetMatSelects();
    this.applyFilter();
  }
  private resetMatSelects(): void {
    if (this.ShootNameSelect) {
      this.ShootNameSelect.value = [];
    }
    if (this.ShowNameSelect) {
      this.ShowNameSelect.value = [];
    }

    if (this.TeamSelect) {
      this.TeamSelect.value = [];
    }
  }

  
  private extractUniqueAttributes(
    data: ogBookings[],
    attribute: string
  ): string[] {
    const attributeSet = new Set<string>(
      data
        .map((item) => {
          function getNestedProperty(obj: any, path: string): any {
            return path.split('.').reduce((acc, key) => acc && acc[key], obj);
          }

          const value = getNestedProperty(item, attribute);
          return typeof value === 'string' || typeof value === 'number'
            ? value.toString().trim()
            : null;
        })
        .filter((attr): attr is string => attr !== null && attr !== '')
    );

    return Array.from(attributeSet).sort();
  }

fetchData(): void {
  this.OgService.getOgBookings().subscribe(data => {



    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.updateFilterOptions();
  });

}

}



