import { Injectable } from '@angular/core';
import  { HttpClient,HttpHeaders} from '@angular/common/http'
import { LogModel } from '../../Models/LogModel';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class LogService {

  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'max-age=600', // set the cache time-to-live to 60 seconds
    }),
  };


  constructor(private http: HttpClient) { }

  logApiURL = environment.apiUrl + '/v1/logs'


  addLog(inputdata:any){
    return this.http.post(`${this.logApiURL}/addLog`, inputdata)
  }
  getAllLogs():Observable<LogModel>{
    return this.http.get<LogModel>(`${this.logApiURL}/getLogs`)
  }

  getInfluencerLogs(inputdata:any):Observable<LogModel>{
    return this.http.get<LogModel>(`${this.logApiURL}/getInfluencerLogs/${inputdata}`)
  }
}
