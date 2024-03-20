import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LogService } from 'src/app/core/services/log.service';
import { LogModel, LogModelUpdated } from 'src/app/core/interfaces/logModel';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewLogComponent } from './view-log/view-log.component';
import { EditItemLogComponent } from './edit-item-log/edit-item-log.component';
import { EditPackageLogComponent } from './edit-package-log/edit-package-log.component';
import { ChangeDetectorRef } from '@angular/core';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-influencer-logs',
  templateUrl: './influencer-logs.component.html',
  styleUrls: ['./influencer-logs.component.scss'],
})
export class InfluencerLogsComponent {
  protected dataSource: any;
  protected UserDetails: any;
  protected talentUserNames: any;
  protected userRole = this.userService.getRole();
  protected userId = this.userService.getID();
  public path = PATH;
  public allInfluencers: string[] = [];
  public allCampaigns: string[] = [];
  public allContacts: string[] = [];

  influencers: string[] = [];
  campaigns: string[] = [];
  contacts: string[] = [];
  filterCriteria: any = {
    search: '',
    campaigns: [],
    influencers: [],
    contacts: [],
  };
  
  displayedColumns: string[] = [
    'Influencer',
    'Campaign',
    'Contact',
    'Time_to_reply',
    'Date',
    'type',
    'Action',
  ];
  filterValues = {
    influencerID: '',
    campaign: '',
    userID: ''
  };
  

  single: boolean = false;
  package: boolean = false;

  logs: LogModelUpdated[] = [];
  log!: LogModelUpdated;

  users: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  @ViewChild('influencerSelect') influencerSelect!: MatSelect;
  @ViewChild('campaignSelect') campaignSelect!: MatSelect;
  @ViewChild('contactSelect') contactSelect!: MatSelect;

  constructor(
    private userService: UserService,
    private router: Router,
    private logService: LogService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.getAllLogs();
    
  }

  ngAfterViewInit() {
    this.extractColumnData();
  }

  private extractColumnData(): void {
    const renderedData = this.table['_data'];

    for (let i = 0; i < renderedData?.length; i++) {
      const row = renderedData[i];
      this.influencers.push(row.influencer ?? '');
      this.campaigns.push(row.campaign ?? '');
      this.contacts.push(row.contact ?? '');
      
    }
  }
  // Add this method to your InfluencerLogsComponent class
  public resetFilters(): void {
    // Reset filter criteria
    this.filterCriteria= {
      search: '',
      campaigns: [],
      influencers: [],
      contacts: [],
    };

    this.allCampaigns = this.extractUniqueAttributes(this.dataSource.data, 'campaigns');
    this.allContacts = this.extractUniqueAttributes(this.dataSource.data, 'user.name');
    this.allInfluencers = this.extractUniqueAttributes(this.dataSource.data, 'influencers.Name');
  
    this.resetMatSelects();
    this.applyFilter();
  }
  private resetMatSelects(): void {
    if (this.influencerSelect) {
      this.influencerSelect.value = [];
    }
    if (this.campaignSelect) {
      this.campaignSelect.value = [];
    }
  
    if (this.contactSelect) {
      this.contactSelect.value = [];
    }
   
  }

  public getAllLogs(): void {
    this.logService.getAllLogsUpdated().subscribe((data) => {
      console.log(data)
      this.logs = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort;
  
      // Extract unique values
      this.allInfluencers = [...new Set(data.map((log: any) => log.influencer.Name))];
      this.allCampaigns = [...new Set(data.map((log: any) => log.campaign))];
      this.allContacts = [...new Set(data.map((log: any) => log.user.name))];
  
      this.updateFilterOptions(); // Move it here
    });
  }
  
  private extractUniqueAttributes(data: LogModelUpdated[], attribute: string): string[] {
    const attributeSet = new Set<string>(
      data.map(item => {
        function getNestedProperty(obj: any, path: string): any {
          return path.split('.').reduce((acc, key) => acc && acc[key], obj);
        }
  
        const value = getNestedProperty(item, attribute);
        return (typeof value === 'string' || typeof value === 'number') ? value.toString().trim() : null;
      }).filter((attr): attr is string => attr !== null && attr !== '')
    );
  
    return Array.from(attributeSet).sort();
  }

  

  public filterInfluencer(influencerID: string): void {
    this.filterValues.influencerID = influencerID;
    this.applyFilter();
    this.updateFilterOptions();
  }
  
  
  public filterCampaign(campaign: string): void {
    this.filterValues.campaign = campaign;
    this.applyFilter();
    this.updateFilterOptions();
  }
  
  public filterContact(contact: string): void {
    this.filterValues.userID = contact;
    this.applyFilter();
    this.updateFilterOptions();
  }
  


  public applyFilter(): void {
    console.log('Applying filter:', this.filterCriteria);
 
    // Rest of your filter logic...
 
    // Apply filter directly without creating lowercaseFilterCriteria
    const searchString = this.filterCriteria.search ? this.filterCriteria.search.toString().toLowerCase() : '';
 
    this.dataSource.filterPredicate = (
       data: LogModelUpdated,
       filter: string
    ): boolean => {
      try {
        const filterObject = JSON.parse(filter);
 
       const isMatchSearch =
          !searchString ||
          data.influencer.Name.toLowerCase().includes(searchString) ||
          data.campaign.toLowerCase().includes(searchString) ||
          data.user.name.toLowerCase().includes(searchString);
 
       const isMatchInfluencer =
          !filterObject.influencers.length ||
          filterObject.influencers.includes(data.influencer?.Name.trim().toLowerCase());
 
       const isMatchCampaign =
          !filterObject.campaigns.length ||
          filterObject.campaigns.includes(data.campaign?.trim().toLowerCase());
 
       const isMatchContact =
          !filterObject.contacts.length ||
          filterObject.contacts.includes(data.user?.name.trim().toLowerCase());
 
 
       return isMatchSearch && isMatchInfluencer && isMatchCampaign && isMatchContact;}
       catch (error) {
        console.error('Error parsing filter JSON:', error);
        return false;
     }
    };
 
    // Convert filterCriteria to lowercase before applying
 
 
    this.dataSource.filter = JSON.stringify(this.filterCriteria);
    this.updateFilterOptions();
 
    this.cdr.detectChanges(); // Update the view
 }
 
  
  
  
  public applyFilterChange(filterType: string, filterValue: any): void {
    console.log(`Filter change - Type: ${filterType}, Value: ${filterValue}`);
  
    switch (filterType) {
      case 'influencers':
        this.filterCriteria.influencers = filterValue.map((val: any) => (typeof val === 'string' ? val.trim().toLowerCase() : val));
        break;
      case 'campaigns':
        this.filterCriteria.campaigns = filterValue.map((val: any) => (typeof val === 'string' ? val.trim().toLowerCase() : val));
        break;
      case 'contacts':
        this.filterCriteria.contacts = filterValue.map((val: any) => (typeof val === 'string' ? val.trim().toLowerCase() : val));
        break;
      default:
        break;
    }
  
    if (!Array.isArray(filterValue)) {
      filterValue = [filterValue];
    }
  
    this.filterCriteria[filterType] = filterValue.map((val: any) => (typeof val === 'string' ? val.trim().toLowerCase() : val));
    this.applyFilter();
    this.updateFilterOptions();
  }
  private updateFilterOptions(): void {
    // Use a copy of the full data set as the starting point for filtering
    let baseFilteredData = [...this.dataSource.data];
  
    // Dynamically update options for each filter based on current filterCriteria
    // Note: It's important to maintain the integrity of each "all" array to allow for multiple selections
  
    // Filter for Influencers options based on all criteria except influencer itself
    this.allInfluencers = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        (!this.filterCriteria.campaigns.length || this.filterCriteria.campaigns.includes(data.campaign?.trim().toLowerCase())) &&
        (!this.filterCriteria.contacts.length || this.filterCriteria.contacts.includes(data.user?.name?.trim().toLowerCase()))
      ),
      'influencer.Name'
    )
    // Filter for Campaigns options based on all criteria except campaign itself
    this.allCampaigns = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        (!this.filterCriteria.influencers.length || this.filterCriteria.influencers.includes(data.influencer?.Name?.trim().toLowerCase())) &&
        (!this.filterCriteria.contacts.length || this.filterCriteria.contacts.includes(data.user?.name?.trim().toLowerCase())) &&
        typeof data.campaign === 'string'
      ),
      'campaign'
    )
  
    // Filter for Contacts options based on all criteria except contact itself
    this.allContacts = this.extractUniqueAttributes(
      baseFilteredData.filter(data =>
        (!this.filterCriteria.influencers.length || this.filterCriteria.influencers.includes(data.influencer?.Name?.trim().toLowerCase())) &&
        (!this.filterCriteria.campaigns.length || this.filterCriteria.campaigns.includes(data.campaign?.trim().toLowerCase()))
      ),
      'user.name' // Make sure this is the correct attribute path for the 'user' name
    )

  }
  
  activeTabIndex: number = 0;
  tabCount: number = 6; 
  nextTab() {
    if (this.activeTabIndex < this.tabCount - 1) {
      this.activeTabIndex++;
    }
  }

  prevTab() {
    if (this.activeTabIndex > 0) {
      this.activeTabIndex--;
    }
  }
  
  
  public onPageChange(event: any): void {
    this.getAllLogs();
  }
  public editInfluencerLog(inputdata: any, type: String): void {
    if (type == 'single') {
      this.dialog?.open(EditItemLogComponent, {
        width: '70%',
        height: '60%',
        exitAnimationDuration: '1000ms',
        enterAnimationDuration: '1000ms',
        data: {
          id: inputdata,
        },
      });
    } else {
      this.dialog?.open(EditPackageLogComponent, {
        width: '70%',
        height: '60%',
        exitAnimationDuration: '1000ms',
        enterAnimationDuration: '1000ms',
        data: {
          id: inputdata,
        },
      });
    }
  }

  public viewInfluencerLog(inputdata: any, type: String): void {
    this.dialog?.open(ViewLogComponent, {
      width: '70%',
      height: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
        type: type,
      },
    });
  }

  public redirectToNewLog(): void {
    this.router.navigate([this.path['newRateLog']]);
  }
}











