import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  ogShow,
  ogShowCreate,
  ogShowEdit,
  ogBookings,
  ogBookingsCreate,
  ogBookingCreateProductionForm,
  ogBookingCreateEditorForm,
  ogBookingCreateGraphicsForm,
  returnData,
  ogBookingsEdit,
  ogBookingProductionForm,
  ogBookingEditorForm,
  ogBookingGraphicsForm,
  ogBookingProductionFormEdit,
  ogBookingEditorFormEdit,
  ogBookingGraphicsFormEdit
} from '../interfaces/og.model';

@Injectable({
  providedIn: 'root',
})
export class OgService {
  constructor(private http: HttpClient) {}

  private ogApiURL = environment.apiUrl + '/v1/ogs';

  getOgShows(): Observable<ogShow[]> {
    return this.http.get<ogShow[]>(`${this.ogApiURL}/getShows`);
  }

  getOgShowById(id: number): Observable<ogShow> {
    return this.http.get<ogShow>(`${this.ogApiURL}/getShowById/${id}`);
  }

  editShowById(id: number, inputdata: ogShowEdit): Observable<returnData> {
    return this.http.patch<returnData>(`${this.ogApiURL}/editShow/${id}`, inputdata);
  }

  addOgShow(inputdata: ogShowCreate): Observable<returnData> {
    return this.http.post<returnData>(`${this.ogApiURL}/addShow`, inputdata);
  }

  getOgBookings(): Observable<ogBookings[]> {
    return this.http.get<ogBookings[]>(`${this.ogApiURL}/getBookings`);
  }

  getOgBookingById(id: number): Observable<ogBookings> {
    return this.http.get<ogBookings>(`${this.ogApiURL}/getBookingById/${id}`);
  }

  getOgBookingByTeam(team: string): Observable<ogBookings[]> {
    return this.http.get<ogBookings[]>(`${this.ogApiURL}/getOgBookingByTeam/${team}`,);
  }

  createOgBooking(inputdata: ogBookingsCreate): Observable<returnData> {
    return this.http.post<returnData>(`${this.ogApiURL}/addBooking`, inputdata);
  }

  editOgBookingById(id: number, inputdata: ogBookingsEdit): Observable<returnData> {
    return this.http.patch<returnData>(`${this.ogApiURL}/editBooking/${id}`, inputdata);
  }

  // Same link used to create all booking forms in the backend, but using 3 different methods to create the forms with different interfaces

  createOgBookingProductionForm(inputdata: ogBookingCreateProductionForm): Observable<returnData> {
    return this.http.post<returnData>(`${this.ogApiURL}/createOgBookingForm`, inputdata);
  }

  createOgBookingEditorForm(inputdata: ogBookingCreateEditorForm): Observable<returnData> {
    return this.http.post<returnData>(`${this.ogApiURL}/createOgBookingForm`, inputdata);
  }

  createOgBookingGraphicsForm(inputdata: ogBookingCreateGraphicsForm): Observable<returnData> {
    return this.http.post<returnData>(`${this.ogApiURL}/createOgBookingForm`, inputdata);
  }

  // Same with editing the forms same link edits but we are uisng 3 different methods to edit the forms with different interfaces

  editOgBookingProductionFormById(id: number, inputdata: ogBookingProductionFormEdit): Observable<returnData> {
    return this.http.patch<returnData>(`${this.ogApiURL}/editOgBookingFormById/${id}`, inputdata);
  }

  editOgBookingEditorFormById(id: number, inputdata: ogBookingEditorFormEdit): Observable<returnData> {
    return this.http.patch<returnData>(`${this.ogApiURL}/editOgBookingFormById/${id}`, inputdata);
  }

  editOgBookingGraphicsFormById(id: number, inputdata: ogBookingGraphicsFormEdit): Observable<returnData> {
    return this.http.patch<returnData>(`${this.ogApiURL}/editOgBookingFormById/${id}`, inputdata);
  }


  //-------------------------------------------------------------------------------------

  getOgBookingProductionFormById(id: number): Observable<ogBookingProductionForm> {
    return this.http.get<ogBookingProductionForm>(`${this.ogApiURL}/getOgBookingProductionFormById/${id}`);
  }

  getOgBookingEditorFormById(id: number): Observable<ogBookingEditorForm> {
    return this.http.get<ogBookingEditorForm>(`${this.ogApiURL}/getOgBookingEditorFormById/${id}`);
  }

  getOgBookingGraphicsFormById(id: number): Observable<ogBookingGraphicsForm> {
    return this.http.get<ogBookingGraphicsForm>(`${this.ogApiURL}/getOgBookingGraphicsFormById/${id}`);
  }

  //-------------------------------------------------------------------------------------

  getBookingProductonFormByBookingId(id: number): Observable<ogBookingProductionForm> {
    return this.http.get<ogBookingProductionForm>(`${this.ogApiURL}/getBookingProductonFormByBookingId/${id}`);
  }

  getBookingEditorFormByBookingId(id: number): Observable<ogBookingEditorForm> {
    return this.http.get<ogBookingEditorForm>(`${this.ogApiURL}/getBookingEditorFormByBookingId/${id}`);
  }

  getBookingGraphicsFormByBookingId(id: number): Observable<ogBookingGraphicsForm> {
    return this.http.get<ogBookingGraphicsForm>(`${this.ogApiURL}/getBookingGraphicsFormByBookingId/${id}`);
  }


  addProductionTeamMembersToBooking(ogbookingFormId: number, productionStaffIds: number[]): Observable<returnData> {
    return this.http.post<returnData>(`${this.ogApiURL}/addProductionTeamMembersToBooking/${ogbookingFormId}`, productionStaffIds);
  }

  updateProductionTeamMembersToBooking(ogbookingFormId: number, productionStaffIds: number[]): Observable<returnData> {
    return this.http.post<returnData>(`${this.ogApiURL}/updateProductionTeamMembersToBooking/${ogbookingFormId}`, productionStaffIds);
  }

}
