import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { InfluencerProfile } from 'src/app/core/interfaces/influencerAPI.model';
import { LogModel, LogModelUpdated } from 'src/app/core/interfaces/logModel';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-influencer-id',
  templateUrl: './influencer-id.component.html',
  styleUrls: ['./influencer-id.component.scss'],
})
export class InfluencerIdComponent implements OnInit {
  influencerId: number = 0;
  profile!: InfluencerProfile;
  selectedPlatform: string | null = null;
  logs: LogModelUpdated[] = [];

  constructor(
    private influencerService: InfluencerService,
    private logService: LogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.influencerId = Number(params.get('id')!);
      this.getInfluencerProfile(this.influencerId);
      this.getInfluencerLogs(this.influencerId);

    });
  }

  private getInfluencerProfile(influencerId: number): void {
    this.influencerService.getInfluencerProfile(influencerId).subscribe((data) => {
      if (data) {
        this.profile = data;
      } else {
        console.error("No data found");
      }
    });
  }



  private getInfluencerLogs(influencerId: number): void {
    this.logService.getInfluencerLogs(influencerId).subscribe((data) => {
      if (data) {
        this.logs = data;
        console.log(this.logs);
      } else {
        console.error("No logs found");
      }
    });
  }

  private isLastApiCallOlderThan30Days(lastApiCall: Date | null): boolean {
    if (!lastApiCall) {
      return true;
    }
    const currentDate = new Date();
    const lastApiCallDate = new Date(lastApiCall);
    const differenceInDays = (currentDate.getTime() - lastApiCallDate.getTime()) / (1000 * 3600 * 24);
    return differenceInDays > 30;
  }

  togglePlatformDetails(platform: string): void {
    if (this.selectedPlatform === platform) {
      this.selectedPlatform = null;
    } else {
      this.selectedPlatform = platform;
    }
  }
}
