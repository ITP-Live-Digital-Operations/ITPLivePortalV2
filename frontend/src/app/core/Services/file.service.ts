import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { saveAs } from 'file-saver';
import { environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileApiUrl = environment.apiUrl + '/v1/files';


  constructor(private http: HttpClient) { }

  uploadFile(file: File, brief_id: number, uploaded_by : number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('brief_id', String(brief_id));
    formData.append('uploaded_by', String(uploaded_by));
    return this.http.post(`${this.fileApiUrl}/upload`, formData);
  }

  downloadFile(id: number, filename: string): Observable<any> {
    return this.http.get(`${this.fileApiUrl}/download/${id}`, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).pipe(
      tap(
        data => {
          saveAs(data, filename);
        },
        error => console.log(error)
      )
    )
  }

  getFile(id: number): Observable<any> {
    return this.http.get(`${this.fileApiUrl}/getFileById/${id}`);
  }

  approveFile(id: number): Observable<any> {
    return this.http.get(`${this.fileApiUrl}/approveFile/${id}`, {});
  }

  addNotes(id: number, notes: string): Observable<any> {
    return this.http.post(`${this.fileApiUrl}/addNotes/${id}`, {notes});
  }
}