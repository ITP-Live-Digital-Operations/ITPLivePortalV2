import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientModel } from 'src/app/core/interfaces/client.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { ClientService } from 'src/app/core/services/client.service';
import { UserService } from 'src/app/core/services/user.service';
import { CampaignModel } from 'src/app/core/interfaces/campaign.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss'],
})
export class EditCampaignComponent {
  protected newCampaignForm: FormGroup;
  private userId = this.userService.getID();
  protected clients: any;
  protected campaign!: CampaignModel;

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private toastrService: ToastrService,
    private clientService: ClientService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public source: any,
  ) {
    this.newCampaignForm = this.formBuilder.group({
      campaignName: ['', [Validators.required]],
      market: ['', [Validators.required]],
      clientId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadCampaign();
  }

  editCampaign(): void {

  }



  loadCampaign() {
    this.campaign = this.source.campaign;
    this.newCampaignForm.patchValue({
      campaignName: this.campaign.campaignName,
      market: this.campaign.market,
      clientId: this.campaign.client.id,
    });
  }

  loadClients() {
    this.clientService.getClients().subscribe((clients: ClientModel[]) => {
      this.clients = clients;
      this.clients.sort((a: any, b: any) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    });
  }
}
