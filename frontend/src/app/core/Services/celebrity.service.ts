import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InfluencerModel, returnData } from '../interfaces/influencersModel';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CelebrityIdandName, CelebrityModel, CelebrityRemark, CelebrityRemarkWithCelebrity, CreateCelebrityRemark } from '../interfaces/celebrity.model';

@Injectable({
  providedIn: 'root',
})
export class CelebrityService {
  constructor(private http: HttpClient) {}

  celebrityApiURL = environment.apiUrl + '/v1/celebrities';

  addCelebrity(inputdata: any) {
    return this.http.post(`${this.celebrityApiURL}/createCelebrity`, inputdata);
  }

  getCelebrities(): Observable<CelebrityModel[]> {
    return this.http.get<CelebrityModel[]>(
      `${this.celebrityApiURL}/getCelebrities`
    );
  }

  getCelebritiesIdsandNames(): Observable<CelebrityIdandName[]> {
    return this.http.get<CelebrityIdandName[]>(
      `${this.celebrityApiURL}/getCelebritiesIdsandNames`
    );
  }

  deleteCelebrity(inputdata: any) {
    return this.http.delete(
      `${this.celebrityApiURL}/deleteCelebrity/${inputdata}`
    );
  }

  getCelebrity(inputdata: any): Observable<CelebrityModel> {
    return this.http.get<CelebrityModel>(
      `${this.celebrityApiURL}/getCelebrity/${inputdata}`
    );
  }

  updateCelebrity(inputdata: any, id: any) {
    return this.http.patch(
      `${this.celebrityApiURL}/updateCelebrity/${id}`,
      inputdata
    );
  }
// -=---------------------------- Remarks ----------------------------=-
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

  // Celebrity Files
uploadCelebrityFile(file: File, celebrityId: number): Observable<returnData> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<returnData>(
    `${this.celebrityApiURL}/uploadCelebrityFile/${celebrityId}`,
    formData,
    {
      reportProgress: true,
      responseType: 'json',
    }
  );
}
  downloadCelebrityFile(id: number): Observable<any> {
    return this.http.get(`${this.celebrityApiURL}/downloadCelebrityFile/${id}`, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getCelebrityFiles(celebrityId: number): Observable<any> {
    return this.http.get(`${this.celebrityApiURL}/getCelebrityFiles/${celebrityId}`, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  deleteCelebrityFile(id: number): Observable<returnData> {
    return this.http.delete<returnData>(
      `${this.celebrityApiURL}/deleteCelebrityFile/${id}`
    );
  }

}


