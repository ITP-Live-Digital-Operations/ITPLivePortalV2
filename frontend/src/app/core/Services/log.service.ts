import { Injectable } from '@angular/core';
import  { HttpClient,HttpHeaders} from '@angular/common/http'
import { LogModel, LogModelUpdated } from '../interfaces/logModel';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment.development'
import { ObjectDestructuringAssignment } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  logApiURL = environment.apiUrl + '/v1/logs'

  addLog(inputdata:any){
    return this.http.post(`${this.logApiURL}/addLog`, inputdata)
  }
  getAllLogs():Observable<LogModel[]>{
    return this.http.get<LogModel[]>(`${this.logApiURL}/getLogs`)
  }

  getAllLogsUpdated(): Observable<LogModelUpdated[]>{
    return this.http.get<LogModelUpdated[]>(`${this.logApiURL}/getAllLogsUpdated`)
  }

  getInfluencerLogs(inputdata:any):Observable<LogModelUpdated[]>{
    return this.http.get<LogModelUpdated[]>(`${this.logApiURL}/getInfluencerLogs/${inputdata}`)
  }

  deleteLog(inputdata:any){
    return this.http.delete(`${this.logApiURL}/deleteLog/${inputdata}`)
  }
  getLogById(inputdata:any):Observable<LogModel>{
    return this.http.get<LogModel>(`${this.logApiURL}/getLogById/${inputdata}`)
  }

  updateSingleLog(id: any, inputdata:any){
    return this.http.patch(`${this.logApiURL}/updateSingleLog/${id}`, inputdata)
  }

  updatePackageLog(id: any, inputdata:any){
    return this.http.patch(`${this.logApiURL}/updatePackageLog/${id}`, inputdata)
  }
}
