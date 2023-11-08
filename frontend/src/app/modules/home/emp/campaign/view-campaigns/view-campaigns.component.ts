import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CampaignModel } from 'src/app/core/interfaces/campaign.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-view-campaigns',
  templateUrl: './view-campaigns.component.html',
  styleUrls: ['./view-campaigns.component.scss'],
})
export class ViewCampaignsComponent {
  protected dataSource: any;

  displayedColumns: string[] = [
    'campaignName',
    'clientName',
    'market',
    'clientIndustry',
    'influencerName',
    'influencerVertical',
    'platform',
    'deliverable',
    'poc',
    'year',
  ];

  campaigns: string[] = [];
  clients: string[] = [];
  influencers: string[] = [];

  filterValues = { campaignName: '', clientName: '', influencerName: '' };

  ngOnInit(): void {
    this.loadCampaigns();
  }

  public userRole = this.userService.getRole();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private userService: UserService,
    private campaignService: CampaignService
  ) {}

  public loadCampaigns() {
    this.campaignService.getCampaigns().subscribe((res) => {

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort;

      // Extract unique values from columns to build filter
      this.campaigns = [
        ...new Set(res.map((result: any) => result.campaignName)),
      ].sort() as string[];
      this.clients = [...new Set(res.map((result: any) => result.clientName))];
      this.influencers = [
        ...new Set(res.map((result: any) => result.influencerName)),
      ];
    });
  }

  public filterInfluencer(influencer: string) {
    this.filterValues.influencerName = influencer;
    this.applyFilter();
    this.updateFilterOptions();
  }

  public filterClient(client: string) {
    this.filterValues.clientName = client;
    this.applyFilter();
    this.updateFilterOptions();
  }

  public filterCampaign(campaign: string) {
    console.log(campaign);
    this.filterValues.campaignName = campaign;
    this.applyFilter();

    this.updateFilterOptions();
  }

  public applyFilter() {
    this.dataSource.filterPredicate = (data: CampaignModel, filter: string) => {
      const searchString = JSON.parse(filter);


      const influencerMatch = searchString.influencerName
        ? data.influencerName
        .toLowerCase()
        .includes(searchString.influencerName.toLowerCase())
        : true;
      const clientMatch = searchString.clientName
        ? data.clientName
        .toLowerCase()
        .includes(searchString.clientName.toLowerCase())
        : true;
      const campaignMatch = searchString.campaignName
        ? data.campaignName
          .toLowerCase()
          .includes(searchString.campaignName.toLowerCase())
        : true;

      return influencerMatch && clientMatch && campaignMatch;
    };

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  private updateFilterOptions() {
    const renderedData = this.dataSource.filteredData || [];

    this.influencers = [
      ...new Set(renderedData.map((result: any) => result.influencerName)),
    ].sort() as string[];

    this.campaigns = [
      ...new Set(renderedData.map((result: any) => result.campaignName)),
    ].sort() as string[];

    this.clients = [
      ...new Set(renderedData.map((result: any) => result.clientName)),
    ].sort() as string[];
  }
}
