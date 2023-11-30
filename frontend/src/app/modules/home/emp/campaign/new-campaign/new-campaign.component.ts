import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientModel } from 'src/app/core/interfaces/client.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { ClientService } from 'src/app/core/services/client.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
})
export class NewCampaignComponent {

  protected newCampaignForm: FormGroup;
  private userId = this.userService.getID();
  protected clients: any;
  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private toastrService: ToastrService,
    private clientService: ClientService,
    private userService: UserService,
  ) {
    this.newCampaignForm = this.formBuilder.group({
      campaignName: ['', [Validators.required]],
      market: ['', [Validators.required]],
      clientId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  addCampaign(): void {
    this.campaignService.addCampaign(this.newCampaignForm.value).subscribe(
      (response: any) => {
        this.toastrService.success('Campaign added successfully');
      },
      (error: any) => {
        this.toastrService.error('Error');
      }
    );
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
