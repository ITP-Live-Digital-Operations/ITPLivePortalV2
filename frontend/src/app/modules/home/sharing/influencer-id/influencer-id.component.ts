import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { InfluencerProfile } from 'src/app/core/interfaces/influencerAPI.model';
import { LogModel, LogModelUpdated } from 'src/app/core/interfaces/logModel';
import { LogService } from 'src/app/core/services/log.service';
import { MatDialog } from '@angular/material/dialog';
import { NewRateLogComponent } from '../../emp/talent/create/rate-logs/new-rate-log/new-rate-log.component';
import { RateLogsComponent } from '../../emp/talent/create/rate-logs/rate-logs.component';

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
    private route: ActivatedRoute,
    private dialog: MatDialog
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
        console.log(this.profile);
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

  openNewLogDialog(): void {
    const dialogRef = this.dialog.open(RateLogsComponent, {
      width: '80%',
      maxWidth: '1000px',
      data: { influencerId: this.influencerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the logs if a new log was added
        this.getInfluencerLogs(this.influencerId);
      }
    });
  }

  togglePlatformDetails(platform: string): void {
    if (this.selectedPlatform === platform) {
      this.selectedPlatform = null;
    } else {
      this.selectedPlatform = platform;
    }
  }
}
