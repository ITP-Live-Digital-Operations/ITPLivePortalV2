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
  public dataSource: any;

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
    'year'
  ];

  ngOnInit(): void {
    this.loadCampaigns();
  }

  public userRole = this.userService.getRole();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private userService: UserService,
              private campaignService : CampaignService) {}


  public loadCampaigns() {
    this.campaignService.getCampaigns().subscribe((res: CampaignModel[]) => {
      console.log(res);
      this.dataSource = new MatTableDataSource<CampaignModel>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
}
