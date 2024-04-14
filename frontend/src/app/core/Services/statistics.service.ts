import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { TopInfluencerCPEmodel } from '../interfaces/stats.model';
import { TopInfluencerCPMmodel } from '../interfaces/stats.model';

import { TopInfluencerMarginmodel } from '../interfaces/stats.model';

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


  // getTopInfluencerbyCPM(influencerId: number){
  //   return this.http.get(`${this.statisticsApiURL}/topInfluencersByCPM/${influencerId}`);  }

  // getTopInfluencersMarginOfProfit(influencerId: number){
  //   return this.http.get(`${this.statisticsApiURL}/topInfluencersMarginOfProfit/${influencerId}`);  }


    getTopInfluencerbyCPM(): Observable<TopInfluencerCPMmodel[]> {
      return this.http.get<TopInfluencerCPMmodel[]>(`${this.statisticsApiURL}/topInfluencersByCPM`);
    }

    gettopinfluencerbyCPE(): Observable<TopInfluencerCPEmodel[]> {
      return this.http.get<TopInfluencerCPEmodel[]>(`${this.statisticsApiURL}/topInfluencersByCPE`);
    }
 
    getTopInfluencersMarginOfProfit(): Observable<TopInfluencerMarginmodel[]> {
      return this.http.get<TopInfluencerMarginmodel[]>(`${this.statisticsApiURL}/topInfluencersMarginOfProfit`);
    }
    
}
