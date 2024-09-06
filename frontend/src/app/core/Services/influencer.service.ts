import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  InfluencerIdsAndNames,
  InfluencerModel,
  createInfluencerRemark,
  getInfluencerNames,
  influencerRemark,
  influencerRemarkWithInfluencer,
  returnData,
} from '../interfaces/influencersModel';
import { InfluencerProfile, InstagramProfile, TikTokProfile, YouTubeProfile } from '../interfaces/influencerAPI.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedInfluencers {
  data: InfluencerModel[];
  meta: PaginationMeta;
}

@Injectable({
  providedIn: 'root',
})
export class InfluencerService {
  constructor(private http: HttpClient) {}

  influencerApiURL = environment.apiUrl + '/v1/influencers';

  // Modash API calls for Influencer Profile start here
  getInfluencerProfile(inputdata: number): Observable<InfluencerProfile> {
    return this.http.get<InfluencerProfile>(
      `${this.influencerApiURL}/getInfluencerProfileV2/${inputdata}`
    );
  }

  updateInfluencerProfile(id: any) {
    return this.http.get(
      `${this.influencerApiURL}/updateInfluencerProfileV2/${id}`,
    );
  }

  getInstagramProfile(inputdata: number): Observable<InstagramProfile> {
    return this.http.get<InstagramProfile>(
      `${this.influencerApiURL}/getInstagramProfile/${inputdata}`
    );
  }

  getYouTubeProfile(inputdata: number): Observable<YouTubeProfile> {
    return this.http.get<YouTubeProfile>(
      `${this.influencerApiURL}/getYouTubeProfile/${inputdata}`
    );
  }

  getTikTokProfile(inputdata: number): Observable<TikTokProfile> {
    return this.http.get<TikTokProfile>(
      `${this.influencerApiURL}/getTikTokProfile/${inputdata}`
    );
  }

  // Modash API calls for Influencer Profile end here
  addInfluencer(inputdata: any) {
    return this.http.post(`${this.influencerApiURL}/addInfluencer`, inputdata);
  }

  getInfluencers(): Observable<PaginatedInfluencers> {
    return this.http.get<PaginatedInfluencers>(
      `${this.influencerApiURL}/getInfluencers`
    );
  }

  getInfluencerNameById(inputdata: any) {
    return this.http.get(
      `${this.influencerApiURL}/getInfluencerNameById/${inputdata}`
    );
  }

  deleteInfluencer(inputdata: any) {
    return this.http.delete(
      `${this.influencerApiURL}/deleteInfluencer/${inputdata}`
    );
  }

  getInfluencer(inputdata: any): Observable<InfluencerModel> {
    return this.http.get<InfluencerModel>(
      `${this.influencerApiURL}/getInfluencer/${inputdata}`
    );
  }

  updateInfluencer(inputdata: any, id: any) {
    return this.http.patch(
      `${this.influencerApiURL}/updateInfluencer/${id}`,
      inputdata
    );
  }

  getInfluencerNames(): Observable<getInfluencerNames[]> {
    return this.http.get<getInfluencerNames[]>(`${this.influencerApiURL}/getInfluencerNames`);
  }

  createInfluencerRating(inputdata: any) {
    return this.http.post(
      `${this.influencerApiURL}/createInfluencerRating`,
      inputdata
    );
  }

  getAverageInfluencerRating(inputdata: any) {
    return this.http.get(
      `${this.influencerApiURL}/getAverageInfluecerRating/${inputdata}`
    );
  }

  getInfluencerRatings(inputdata: any) {
    return this.http.get(
      `${this.influencerApiURL}/getInfluencerRatings/${inputdata}`
    );
  }

  getGenders() {
    return this.http.get(`${this.influencerApiURL}/getGenders`);
  }

  getLocations() {
    return this.http.get(`${this.influencerApiURL}/getLocations`);
  }

  getVerticals() {
    return this.http.get(`${this.influencerApiURL}/getVerticals`);
  }

  getNationalities() {
    return this.http.get(`${this.influencerApiURL}/getNationalities`);
  }

  getCities() {
    return this.http.get(`${this.influencerApiURL}/getCities`);
  }

  getInfluencersWithRatings(): Observable<PaginatedInfluencers> {
    return this.http.get<PaginatedInfluencers>(
      `${this.influencerApiURL}/getInfluencersWithRatings`
    );
  }

  getInfluencerStatisticsById(inputdata: any) {
    return this.http.get(
      `${this.influencerApiURL}/getInfluencerStatisticsById/${inputdata}`
    );
  }

  getInfluencerIdsandNames(): Observable<InfluencerIdsAndNames[]> {
    return this.http.get<InfluencerIdsAndNames[]>(
      `${this.influencerApiURL}/getInfluencerIdsandNames`
    );
  }

  addStatsToInfluencer(inputdata: any, id: any) {
    return this.http.post(
      `${this.influencerApiURL}/addStatsToInfluencer/${id}`,
      inputdata
    );
  }

  addInfluencerStats(
    campaignId: number,
    influencerId: number,
    poc: string,
    platformDeliverable: string,
    stats: any
  ) {
    return this.http.post(`${this.influencerApiURL}/addInfluencerStats`, {
      campaignId: campaignId,
      influencerId: influencerId,
      platformDeliverable: platformDeliverable,
      poc: poc,
      stats: stats,
    });
  }

  createInfluencerRemark(inputdata: createInfluencerRemark): Observable<returnData> {
    return this.http.post<returnData>(
      `${this.influencerApiURL}/createInfluencerRemark`,
      inputdata
    );
  }
  getInfluencerRemarkById(id: number): Observable<influencerRemarkWithInfluencer> {
    return this.http.get<influencerRemarkWithInfluencer>(
      `${this.influencerApiURL}/getInfluencerRemarkById/${id}`
    );
  }

  getInfluencerRemarks(infuencerId: number): Observable<influencerRemark[]> {
    return this.http.get<influencerRemark[]>(
      `${this.influencerApiURL}/getInfluencerRemarks/${infuencerId}`
    );
  }

  updateInfluencerRemark(id: number, note: string): Observable<returnData> {
    return this.http.patch<returnData>(`${this.influencerApiURL}/updateInfluencerRemark/${id}`, note);
  }

  deleteInfluencerRemark(id: number): Observable<returnData>{
    return this.http.delete<returnData>(`${this.influencerApiURL}/deleteInfluencerRemark/${id}`);
  }

  getModashProfile(influencerId: number): Observable<any> {
    return this.http.get(`${this.influencerApiURL}/getModashProfile/${influencerId}`);
  }

}
