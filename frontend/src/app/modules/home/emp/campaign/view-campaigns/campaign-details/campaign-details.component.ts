import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CampaignModel } from 'src/app/core/interfaces/campaign.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { InfluencerIdComponent } from 'src/app/modules/home/sharing/influencer-id/influencer-id.component';
import { EditCampaignComponent } from '../../edit-campaign/edit-campaign.component';
import { CampaignResultsComponent } from 'src/app/modules/home/emp/campaign/view-campaigns/campaign-details/campaign-results/campaign-results.component';
import { AddInfluecersToCampaignComponent } from '../../../talent/view-brief/add-influecers-to-campaign/add-influecers-to-campaign.component';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent {
  protected id: any;
  protected campaign!: CampaignModel;
  public dataSource: InfluencerStatistic[] = [];
  protected campaignId!: number;

  isTableVisible: boolean = true; // Initially, the table is visible

  toggleTableVisibility(): void {
    this.isTableVisible = !this.isTableVisible;
  }

  protected displayedColumns: string[] = [
    'name',
    'platform',
    'deliverable',
    'followers',
    'reach',
    'impressions',
    'interactions',
    'clientCost',
    'influencerCost',
    'engagementRate',
    'year',
    'Action'
    
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCampaignData();
  }

  onCampaignEdited(): void {
    this.loadCampaignData();
  }

  protected loadCampaignData(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.campaignService
        .getCampaignById(this.id)
        .subscribe((data: CampaignModel) => {
          console.log(data);
          this.campaign = data;
          const originalJson = {
            Influencers: this.campaign.Influencers,
          };


          originalJson.Influencers.forEach((influencer) => {
            let isFirstStatistic = true;
            if(influencer.influencerStatistics.length === 0) {
              this.dataSource.push({
                showName: isFirstStatistic,
                influencerId: influencer.id,
                name: isFirstStatistic ? influencer.Name : '',
                platform: '',
                deliverable: '',
                followers: 0,
                reach: 0,
                impressions: 0,
                interactions: 0,
                clientCost: 0,
                influencerCost: 0,
                engagementRate: 0.0,
                year: 0,
              });
            }
            else{
            influencer.influencerStatistics.forEach((stat) => {
              this.dataSource.push({
                showName: isFirstStatistic,
                influencerId: influencer.id,
                name: isFirstStatistic ? influencer.Name : '',
                platform: stat.platform,
                deliverable: stat.deliverable,
                followers: stat.followers,
                reach: stat.reach,
                impressions: stat.impressions,
                interactions: stat.interactions,
                clientCost: stat.clientCost,
                influencerCost: stat.influencerCost,
                engagementRate: stat.engagementRate,
                year: stat.year,
              });
              isFirstStatistic = false;
            });

          }
          });
          this.cdr.detectChanges();
        });
    });
  }

  public viewInfluencer(inputdata: any): void {
    this.dialog?.open(InfluencerIdComponent, {
      width: '100%',
      height: '95%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
    });
  }

 EditCampaign() {
    this.dialog?.open(EditCampaignComponent, {
      width: '80%',
      height: '65%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        campaign: this.campaign,
      },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.loadCampaignData();
    });
  }

  addInfluencerResults() {
    const influencers = this.campaign.Influencers.map(influencer => {
      return {
        id: influencer.id,
        Name: influencer.Name
      };
    });

    this.dialog?.open(CampaignResultsComponent, {
      width: '100%',
      height: '95%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        campaignId: this.campaign.id,
        influencers: influencers,
      },
    }).afterClosed().subscribe(() => {
      this.loadCampaignData();
    });
  }
  addInfluencers() {
    this.campaignId = this.campaign?.id;

    const dialogRef = this.dialog?.open(AddInfluecersToCampaignComponent, {
      width: '50%',
      height: '90%',
      data: {campaignId: this.campaignId},
    });
    dialogRef.afterClosed().subscribe(() => {
        window.location.reload();
    });
  }
  public editCampaign(inputdata: any): void {
  
  }
  public deleteCampaign(inputdata: any): void {
 
  }

}

export interface InfluencerStatistic {
  influencerId: number;
  showName: boolean;
  name: string;
  platform: string;
  deliverable: string;
  followers: number;
  reach: number;
  impressions: number;
  interactions: number;
  clientCost: number; // Assuming clientCost is a string
  influencerCost: number; // Assuming influencerCost is a string
  year: number;
  engagementRate: number;
}
