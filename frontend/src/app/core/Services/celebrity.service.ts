import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfluencerModel, returnData } from '../interfaces/influencersModel';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CelebrityRemark, CelebrityRemarkWithCelebrity, CreateCelebrityRemark } from '../interfaces/celebrity.model';

@Injectable({
  providedIn: 'root',
})
export class CelebrityService {
  constructor(private http: HttpClient) {}

  celebrityApiURL = environment.apiUrl + '/v1/celebrities';

  addCelebrity(inputdata: any) {
    return this.http.post(`${this.celebrityApiURL}/createCelebrity`, inputdata);
  }

  getCelebrities(): Observable<InfluencerModel[]> {
    return this.http.get<InfluencerModel[]>(
      `${this.celebrityApiURL}/getCelebrities`
    );
  }

  deleteCelebrity(inputdata: any) {
    return this.http.delete(
      `${this.celebrityApiURL}/deleteCelebrity/${inputdata}`
    );
  }

  getCelebrity(inputdata: any): Observable<InfluencerModel> {
    return this.http.get<InfluencerModel>(
      `${this.celebrityApiURL}/getCelebrity/${inputdata}`
    );
  }

  updateCelebrity(inputdata: any, id: any) {
    return this.http.patch(
      `${this.celebrityApiURL}/updateCelebrity/${id}`,
      inputdata
    );
  }

  createCelebrityRemark(inputdate: CreateCelebrityRemark): Observable<returnData> {
    return this.http.post<returnData>(
      `${this.celebrityApiURL}/createCelebrityRemark`,
      inputdate
    );
  }

  getCelebrityRemarkById(id: number): Observable<CelebrityRemarkWithCelebrity> {
    return this.http.get<CelebrityRemarkWithCelebrity>(
      `${this.celebrityApiURL}/getCelebrityRemarkById/${id}`
    );
  }

  getCelebrityRemarks(celebrityId: number): Observable<CelebrityRemark[]> {
    return this.http.get<CelebrityRemark[]>(
      `${this.celebrityApiURL}/getCelebrityRemarks/${celebrityId}`
    );
  }

  updateCelebrityRemark(id: number, note: string): Observable<returnData> {
    return this.http.patch<returnData>(
      `${this.celebrityApiURL}/updateCelebrityRemark/${id}`,
      { note }
    );
  }

  deleteCelebrityRemark(id: number): Observable<returnData> {
    return this.http.delete<returnData>(
      `${this.celebrityApiURL}/deleteCelebrityRemark/${id}`
    );
  }
}
