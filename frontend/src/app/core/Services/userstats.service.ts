import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { userCountModel } from '../interfaces/userStats.model';

@Injectable({
  providedIn: 'root'
})
export class UserstatsService {

  constructor(private http: HttpClient) { }

  authApiURL = environment.apiUrl + '/v1/userStats';

  countUploadedBriefsByUser(): Observable<userCountModel[]> {
    return this.http.get<userCountModel[]>(`${this.authApiURL}/countUploadedBriefsByUser`);
  }

  countAddedLogsByUser(): Observable<userCountModel[]> {
    return this.http.get<userCountModel[]>(`${this.authApiURL}/countAddedLogsByUser`);
  }

  countAddedInfluencersByUser(): Observable<userCountModel[]> {
    return this.http.get<userCountModel[]>(`${this.authApiURL}/countAddedInfluencersByUser`);
  }

  countAddedCelebritiesByUser(): Observable<userCountModel[]> {
    return this.http.get<userCountModel[]>(`${this.authApiURL}/countAddedCelebritiesByUser`);
  }

  countAddedClientsByUser(): Observable<userCountModel[]>{
    return this.http.get<userCountModel[]>(`${this.authApiURL}/countAddedClientsByUser`);
  }

  countAddedFilesByUser(): Observable<userCountModel[]>{
    return this.http.get<userCountModel[]>(`${this.authApiURL}/countAddedFilesByUser`);
  }

  countTalentTasks(): Observable<userCountModel[]> {
    return this.http.get<userCountModel[]>(`${this.authApiURL}/countTalentTasks`);
  }
}
