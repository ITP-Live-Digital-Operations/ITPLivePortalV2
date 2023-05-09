import { Injectable } from '@angular/core';
import  { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment} from '../../../environments/environment.development'


@Injectable({
  providedIn: 'root'
})
export class SalesService {



  constructor(private http: HttpClient) { }

  salesApiURL = environment.apiUrl + '/v1/salesbriefs'


  createBrief(inputdata:any){
    return this.http.post(`${this.salesApiURL}/createSalesBrief`, inputdata)
  }

  getSalesBriefsNotViewedByTalent(){
    return this.http.get(`${this.salesApiURL}/getSalesBriefsNotViewedByTalent`, )
  }

  getAllBriefs(){
    return this.http.get(`${this.salesApiURL}/getAllSalesBriefs`)
  }

  viewedByTalent(id:any){
    return this.http.get(`${this.salesApiURL}/viewedByTalent/${id}`)
  }

  getSalesBrief(id:any){
    return this.http.get(`${this.salesApiURL}/getSalesBrief/${id}` )
  }

  assignSalesBrief(inputdata:any){
    return this.http.post(`${this.salesApiURL}/createTask/`, inputdata)
  }

  getSalesBriefIdbyTaskId(id:any){
    return this.http.get(`${this.salesApiURL}/getSalesBriefIdbyTaskId/${id}`)
  }

  getSalesBriefWithFiles(id:any){
    return this.http.get(`${this.salesApiURL}/getSalesBriefWithFiles/${id}`)
  }

  updateAssignedStatus(id:any){
    return this.http.get(`${this.salesApiURL}/updateAssignedStatus/${id}`)
  }

  updateStatus(id:any){
    return this.http.get(`${this.salesApiURL}/updateStatus/${id}`)
  }

  
}
