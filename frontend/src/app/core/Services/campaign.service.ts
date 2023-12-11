import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CampaignModel, createCampaignModel } from '../interfaces/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  private campaignApiURL = environment.apiUrl + '/v1/campaigns';

  getCampaigns(): Observable<CampaignModel[]> {
    return this.http.get<CampaignModel[]>(`${this.campaignApiURL}/getCampaigns`);
  }

  getCampaignById(inputdata: any): Observable<CampaignModel> {
    return this.http.get<CampaignModel>(`${this.campaignApiURL}/getCampaignById/${inputdata}`);
  }

  addCampaign(inputdata: createCampaignModel): Observable<any> {
    return this.http.post<any>(`${this.campaignApiURL}/addCampaign`, inputdata);
  }

  addInfluencersToCampaign(id: number, inputdata:any): Observable<any> {
    return this.http.post<any>(`${this.campaignApiURL}/addInfluencersToCampaign/${id}`, inputdata);
  }


}



