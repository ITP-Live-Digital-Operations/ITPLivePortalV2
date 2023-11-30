import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModel, createClientModel } from '../interfaces/client.model';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  clientApiURL = environment.apiUrl + '/v1/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.clientApiURL}/getClients`);
  }

  addClient(client: createClientModel): Observable<any> {
    return this.http.post(`${this.clientApiURL}/addClient`, client);
  }
}





