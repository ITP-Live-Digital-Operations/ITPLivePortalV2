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

  editCampaign(id: number, inputdata: any): Observable<any> {
    return this.http.patch<any>(`${this.campaignApiURL}/editCampaign/${id}`, inputdata);
  }

  editCampaignInfluencers(id: number, inputdata: any): Observable<any> {
    return this.http.post<any>(`${this.campaignApiURL}/editCampaignInfluencers/${id}`, inputdata);
  }

  getCampaignInfluencers(id: number): Observable<any> {
    return this.http.get<any>(`${this.campaignApiURL}/getCampaignInfluencers/${id}`);
  }

  uploadCampaignFile(file: File, campaignId: number, uploadedBy: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('campaignId', String(campaignId));
    formData.append('uploadedBy', String(uploadedBy));
    return this.http.post(`${this.campaignApiURL}/uploadCampaignFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  downloadCampaignFile(id: number, filename?: string): Observable<any> {
    return this.http.get(`${this.campaignApiURL}/downloadCampaignFile/${id}`, {
      responseType: 'blob',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}



