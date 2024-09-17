import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { ExportModashInfluencerProfile, InfluencerProfile, InstagramProfile } from 'src/app/core/interfaces/influencerAPI.model';
import { LogModelUpdated } from 'src/app/core/interfaces/logModel';
import { LogService } from 'src/app/core/services/log.service';
import { MatDialog } from '@angular/material/dialog';
import { RateLogsComponent } from '../../emp/talent/create/rate-logs/rate-logs.component';
import { EditInfluencerComponent } from '../../emp/talent/edit/edit-influencer/edit-influencer.component';
import { ExportModashProfileComponent } from './export-modash-profile/export-modash-profile.component';

@Component({
  selector: 'app-influencer-id',
  templateUrl: './influencer-id.component.html',
  styleUrls: ['./influencer-id.component.scss'],
})
export class InfluencerIdComponent implements OnInit {
  influencerId: number = 0;
  profile!: InfluencerProfile;
  exportProfile !: ExportModashInfluencerProfile;
  selectedPlatform: string | null = null;
  logs: LogModelUpdated[] = [];
  influencerLevel: string = '';

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
      this.getModashInfluencerProfile(this.influencerId);

    });
  }

  private getInfluencerProfile(influencerId: number): void {
    this.influencerService.getInfluencerProfile(influencerId).subscribe((data) => {
      if (data) {
        this.profile = data;

        console.log(this.profile);
        this.influencerLevel = this.getInfluencerCategory();
      } else {
        console.error("No data found");
      }
    });
  }

  private getModashInfluencerProfile(influencerId: number): void {
    this.influencerService.getModashProfile(influencerId).subscribe((data) => {
      if (data) {
        this.exportProfile = data;
        console.log(this.exportProfile);
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

  public editInfluencer(inputdata: any): void {
    this.dialog?.open(EditInfluencerComponent, {
      width: '990px',
      height: '700px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: inputdata,
      },
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

  exportInfluencer(profile: ExportModashInfluencerProfile): void {
    this.dialog.open(ExportModashProfileComponent, {
      width: '60%',
      height: '90%',
      data: { profile }
    });
  }

  getInfluencerCategory(): string {
    const followers = [
      this.profile.InstagramFollowers || 0,
      this.profile.TiktokFollowers || 0,
      this.profile.YoutubeFollowers || 0
    ];

    const maxFollowers = Math.max(...followers);
    if (maxFollowers < 10000) {
      return 'Nano';
    } else if (maxFollowers < 100000) {
      return 'Micro';
    } else if (maxFollowers < 1000000) {
      return 'Macro';
    } else {
      return 'Mega';
    }
  }

  togglePlatformDetails(platform: string): void {
    if (this.selectedPlatform === platform) {
      this.selectedPlatform = null;
    } else {
      this.selectedPlatform = platform;
    }
  }
}
