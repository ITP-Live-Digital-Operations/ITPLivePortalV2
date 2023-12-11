import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CampaignModel } from 'src/app/core/interfaces/campaign.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { InfluencerIdComponent } from 'src/app/modules/home/sharing/influencer-id/influencer-id.component';
import { EditCampaignComponent } from '../../edit-campaign/edit-campaign.component';


@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent {
  protected id: any;
  protected campaign!: CampaignModel;
  public dataSource: InfluencerStatistic[] = [];

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
    'metric',
    'year',
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

  ngOnChanges(): void {}

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
                metric: stat.metric,
                year: stat.year,
              });

              isFirstStatistic = false;
            });
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

  redirectToNewCampaign() {
    this.dialog?.open(EditCampaignComponent, {
      width: '80%',
      height: '65%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        campaign: this.campaign,
      },
    });
  }
}

interface InfluencerStatistic {
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
  metric: string;
  year: number;
}
