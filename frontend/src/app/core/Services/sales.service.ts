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

  salesBriefReady(id:any){
    return this.http.get(`${this.salesApiURL}/salesBriefReady/${id}`)
  }


  getBriefByCreatedbyId(id:any){
    return this.http.get(`${this.salesApiURL}/getBriefByCreatedbyId/${id}`)
  }

  changeStatus(id:any, inputdata :any){
    return this.http.post(`${this.salesApiURL}/changeStatus/${id}`, inputdata)
  }

  getUserReadyBriefs(id:any){
    return this.http.get(`${this.salesApiURL}/getUserReadyBriefs/${id}`)
  }

  viewBriefBySales(id:any){
    return this.http.get(`${this.salesApiURL}/viewBriefBySales/${id}`)
  }

  viewMyBriefs(id:any){
    return this.http.get(`${this.salesApiURL}/viewMyBriefs/${id}`)
  }

  updateBrief(id:any, inputdata :any){
    return this.http.patch(`${this.salesApiURL}/updateBrief/${id}`, inputdata)
  }

}
