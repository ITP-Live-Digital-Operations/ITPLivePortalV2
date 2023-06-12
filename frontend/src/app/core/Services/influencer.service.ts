import { Injectable } from '@angular/core';
import  { HttpClient} from '@angular/common/http'
import {InfluencerModel} from "../../Models/InfluencerModel"
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment.development'

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
  providedIn: 'root'
})

export class InfluencerService{




  constructor(private http:HttpClient, ){}

  influencerApiURL = environment.apiUrl + '/v1/influencers'



  addInfluencer(inputdata:any){
    return this.http.post(`${this.influencerApiURL}/addInfluencer`, inputdata)
  }

  getInfluencers():Observable<PaginatedInfluencers>{
    return this.http.get<PaginatedInfluencers>(`${this.influencerApiURL}/getInfluencers`)
  }

  deleteInfluencer(inputdata:any){
    return this.http.delete(`${this.influencerApiURL}/deleteInfluencer/${inputdata}`)
  }

  getInfluencer(inputdata:any):Observable<InfluencerModel>{
    return this.http.get<InfluencerModel>(`${this.influencerApiURL}/getInfluencer/${inputdata}`)
  }

  updateInfluencer(inputdata:any, id:any){
    return this.http.patch(`${this.influencerApiURL}/updateInfluencer/${id}`, inputdata)
  }

  getInfluencerNames(){
    return this.http.get(`${this.influencerApiURL}/getInfluencerNames`)
  }

  createInfluencerRating(inputdata:any){
    return this.http.post(`${this.influencerApiURL}/createInfluencerRating`, inputdata)
  }

  getAverageInfluencerRating(inputdata:any){
    return this.http.get(`${this.influencerApiURL}/getAverageInfluecerRating/${inputdata}`)
  }

  getInfluencerRatings(inputdata:any){
    return this.http.get(`${this.influencerApiURL}/getInfluencerRatings/${inputdata}`)
  }

  getGenders(){
    return this.http.get(`${this.influencerApiURL}/getGenders`)
  }

  getLocations(){
    return this.http.get(`${this.influencerApiURL}/getLocations`)
  }

  getVerticals(){
    return this.http.get(`${this.influencerApiURL}/getVerticals`)
  }

  getNationalities(){
    return this.http.get(`${this.influencerApiURL}/getNationalities`)
  }

  getInfluencersWithRatings():Observable<PaginatedInfluencers>{
    return this.http.get<PaginatedInfluencers>(`${this.influencerApiURL}/getInfluencersWithRatings`)
  }
}
