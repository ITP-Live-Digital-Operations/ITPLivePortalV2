import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  statisticsApiURL = environment.apiUrl + '/v1/statistics';


  getClientMetrics() {
    return this.http.get(`${this.statisticsApiURL}/getClientMetrics`);
  }

  getCampaignMetrics() {
    return this.http.get(`${this.statisticsApiURL}/getCampaignMetrics`);
  }

  getCampaignMetricsByClientId(clientId: number) {
    return this.http.get(`${this.statisticsApiURL}/getCampaignMetricsByClientId/${clientId}`);
  }

  getInfluencerCampaignMetricsByCampaignId(campaignId: number) {
    return this.http.get(`${this.statisticsApiURL}/getInfluencerCampaignMetricsByCampaignId/${campaignId}`);
  }

  getInfluencerCampaignMetricsByInfluencerId(influencerId: number) {
    return this.http.get(`${this.statisticsApiURL}/getInfluencerCampaignMetricsByInfluencerId/${influencerId}`);
  }
}
