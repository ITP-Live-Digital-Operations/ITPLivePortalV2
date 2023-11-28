import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CampaignModel } from '../interfaces/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  campaignApiURL = environment.apiUrl + '/v1/campaigns';

  getCampaigns(): Observable<CampaignModel[]> {
    return this.http.get<CampaignModel[]>(`${this.campaignApiURL}/getCampaigns`);
  }

  getCampaignById(inputdata: any): Observable<CampaignModel> {
    return this.http.get<CampaignModel>(`${this.campaignApiURL}/getCampaignById/${inputdata}`);
  }
}
