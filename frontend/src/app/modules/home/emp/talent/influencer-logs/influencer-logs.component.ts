import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LogService } from 'src/app/core/services/log.service';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { LogModel } from 'src/app/core/interfaces/logModel';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewLogComponent } from './view-log/view-log.component';
import { EditItemLogComponent } from './edit-item-log/edit-item-log.component';
import { EditPackageLogComponent } from './edit-package-log/edit-package-log.component';

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

  influencers: number[] = [];
  campaigns: string[] = [];
  contacts: number[] = [];

  filterValues = { influencerID: '', campaign: '', userID: '' };

  single : boolean = false;
  package : boolean = false;

  logs : LogModel[] = [];
  log !: LogModel;

  users : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = [
    'Influencer',
    'Campaign',
    'Contact',
    'Time_to_reply',
    'Date',
    'type',
    'Action',
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private logService : LogService,
    private dialog : MatDialog,
  ) {}


  ngOnInit(): void {
    this.getAllLogs();
  }

  public getAllLogs(): void {
    this.logService.getAllLogs().subscribe((data) => {
      console.log(data);
      this.logs = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort;

      // Extract unique values
      this.influencers = [...new Set(data.map((log: any) => log.influencerID))];
      this.campaigns = [...new Set(data.map((log: any) => log.campaign))];
      this.contacts = [...new Set(data.map((log: any) => log.userID))];
      });
  }




  public filterInfluencer(influencerID: string) {
  this.filterValues.influencerID = influencerID;
  this.applyFilter();
  this.updateFilterOptions();
  }

  public filterCampaign(campaign: string) {
  this.filterValues.campaign = campaign;
  this.applyFilter();
  this.updateFilterOptions();
  }

  public filterContact(contact: string) {
  this.filterValues.userID = contact;
  this.applyFilter();
  this.updateFilterOptions();
  }

  public applyFilter() {
    this.dataSource.filterPredicate = (data: LogModel, filter: string): boolean => {
      const searchString = JSON.parse(filter);

      const influencerMatch = searchString.influencerID ? data.influencerID === searchString.influencerID : true;
      const campaignMatch = searchString.campaign ? data.campaign.toLowerCase().includes(searchString.campaign.toLowerCase()) : true;
      const userMatch = searchString.userID ? data.userID === searchString.userID : true;

      return influencerMatch && campaignMatch && userMatch;
    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  private updateFilterOptions() {

    const renderedData = this.dataSource.filteredData || [];

    this.influencers = [...new Set(renderedData.map((log: any) => log.influencerID))].sort() as number[];

    this.campaigns = [...new Set(renderedData.map((log: any) => log.campaign))].sort() as string[];

    this.contacts = [...new Set(renderedData.map((log: any) => log.userID))].sort() as number[];
  }


  public editInfluencerLog(inputdata: any, type : String): void {
    if(type == "single"){
        this.dialog?.open(EditItemLogComponent, {
          width: '70%',
          height: '60%',
          exitAnimationDuration: '1000ms',
          enterAnimationDuration: '1000ms',
          data: {
            id: inputdata,
          },
        })
    }
    else{
      this.dialog?.open(EditPackageLogComponent, {
        width: '70%',
        height: '60%',
        exitAnimationDuration: '1000ms',
        enterAnimationDuration: '1000ms',
        data: {
          id: inputdata,
        },
      })
    }
  }

  public viewInfluencerLog(inputdata: any, type : String): void {
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
