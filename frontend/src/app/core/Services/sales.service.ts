import { Injectable } from '@angular/core';
import  { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment} from '../../../environments/environment.development'


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'max-age=600', // set the cache time-to-live to 60 seconds
    }),
  };

  constructor(private http: HttpClient) { }

  salesApiURL = environment.apiUrl + '/v1/salesbriefs'
 

  createBrief(inputdata:any){
    return this.http.post(`${this.salesApiURL}/createSalesBrief`, inputdata)
  }

  getSalesBriefsNotViewedByTalent(){
    return this.http.get(`${this.salesApiURL}/getSalesBriefsNotViewedByTalent`, this.httpOptions)
  }
  getAllBriefs(){
    return this.http.get(`${this.salesApiURL}/getAllSalesBriefs`, this.httpOptions)
  }
  viewedByTalent(id:any){
    return this.http.get(`${this.salesApiURL}/viewedByTalent/${id}`)
  }

  getSalesBrief(id:any){
    return this.http.get(`${this.salesApiURL}/getSalesBrief/${id}`, this.httpOptions)
  }

  assignSalesBrief(inputdata:any){
    return this.http.post(`${this.salesApiURL}/createTask/`, inputdata)
  }

  getSalesBriefIdbyTaskId(id:any){
    return this.http.get(`${this.salesApiURL}/getSalesBriefIdbyTaskId/${id}`)
  }
}
