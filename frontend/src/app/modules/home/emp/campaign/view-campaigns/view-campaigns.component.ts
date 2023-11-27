import { Component, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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
  public userRole = this.userService.getRole();

  protected campaigns: string[] = [];
  protected clients: string[] = [];
  protected influencers: string[] = [];

  protected displayedColumns: string[] = [
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

  protected filterValues = { campaignName: '', clientName: '', influencerName: '' };

  filteredCampaigns: string[] = [];
  filteredClients: string[] = [];
  filteredInfluencers: string[] = [];

  selectedCampaign: string = '';
  selectedClient: string = '';
  selectedInfluencer: string = '';

  ngOnInit(): void {
    this.loadCampaigns();

    this.filteredCampaigns = this.campaigns;
    this.filteredClients = this.clients;
    this.filteredInfluencers = this.influencers;

  }

  searchCampaigns(searchTerm: string) {
    if (searchTerm) {
      this.filteredCampaigns = this.campaigns.filter((campaign) =>
        campaign.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filterCampaign(searchTerm.toLowerCase());
    } else {
      // Reset to all campaigns if the search term is empty
      this.filteredCampaigns = this.campaigns;
      this.filterCampaign(searchTerm.toLowerCase());
    }
  }

  searchClients(searchTerm: string) {
    if (searchTerm) {
      this.filteredClients = this.clients.filter((client) =>
        client.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filterClient(searchTerm.toLowerCase());
    } else {
      // Reset to all clients if the search term is empty
      this.filteredClients = this.clients;
      this.filterClient(searchTerm.toLowerCase());
    }
  }

  searchInfluencers(searchTerm: string) {
    if (searchTerm) {
      this.filteredInfluencers = this.influencers.filter((influencer) =>
        influencer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filterInfluencer(searchTerm.toLowerCase());
    } else {
      // Reset to all influencers if the search term is empty
      this.filteredInfluencers = this.influencers;
      this.filterInfluencer(searchTerm.toLowerCase());
    }
  }


  onCampaignSelect(event: MatAutocompleteSelectedEvent) {
    this.selectedCampaign = event.option.value;
    this.filterCampaign(this.selectedCampaign.toLowerCase());
  }

  onClientSelect(event: MatAutocompleteSelectedEvent) {
    this.selectedClient = event.option.value;
    this.filterClient(this.selectedClient.toLowerCase());
  }

  onInfluencerSelect(event: MatAutocompleteSelectedEvent) {
    this.selectedInfluencer = event.option.value;
    this.filterInfluencer(this.selectedInfluencer.toLowerCase());
  }

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
