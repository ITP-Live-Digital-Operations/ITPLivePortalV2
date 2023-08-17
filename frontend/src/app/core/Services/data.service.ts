import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) { }

  dataApiURL = environment.apiUrl + '/v1/seeds';

  exportSeeds(){
    return this.http.get(`${this.dataApiURL}/export-seeds`);
  }

  accessToken(){
    return this.http.get(`${environment.apiUrl}/powerbi/token`);
  }

}


