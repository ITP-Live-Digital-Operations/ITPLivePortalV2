import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-results',
  templateUrl: './campaign-results.component.html',
  styleUrls: ['./campaign-results.component.scss']
})
export class CampaignResultsComponent {
  @Input() profileData: any;
}
