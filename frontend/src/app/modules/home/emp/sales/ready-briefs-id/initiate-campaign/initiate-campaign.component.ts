import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CampaignModel } from 'src/app/core/interfaces/campaign.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-initiate-campaign',
  templateUrl: './initiate-campaign.component.html',
  styleUrls: ['./initiate-campaign.component.scss'],
})
export class InitiateCampaignComponent {
  @Input()
  brief = this.source.brief;

  filesUploaded!: File[]
  fileToUpload!: File;

  constructor(
    private campaignService: CampaignService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public source: any,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  transferedFile(file: File) {
    this.fileToUpload = file;
  }

  transferedFiles(files: File[]) {
    this.filesUploaded = files;
  }

  public initiateCampaign(): void {
    console.log(this.filesUploaded)
    const markets = this.brief.AudienceLocation.split(',');
    const firstMarket = markets[0];

    const campaign = {
      campaignName: this.brief.CampaignName,
      market: firstMarket,
      clientId: this.brief.client.id,
      brandId: this.brief.brand.id,
      createdBy: this.userService.getID(),
      briefId: this.brief.id,
    };

    this.campaignService.addCampaign(campaign).subscribe((newCampaign: any) => {
      for (let i = 0; i < this.filesUploaded.length; i++) {
        this.campaignService
          .uploadCampaignFile(
            this.filesUploaded[i],
            newCampaign.campaign.id,
            this.userService.getID()
          )
          .subscribe((data: any) => {
            console.log(data);
          });
      }
      this.dialog.closeAll();
    });
  }
}
