import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Notification } from 'src/app/core/interfaces/notificationModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

notificationApiUrl = environment.apiUrl + '/v1/notifications';

constructor(private http: HttpClient) { }

createNotification(id:any, input: any) {
  return this.http.post(`${this.notificationApiUrl}/create/${id}`, input);
}

getNotificationsByUserId(userId: any):Observable<Notification[]> {
  return this.http.get<Notification[]>(`${this.notificationApiUrl}/getNotifications/${userId}`);
}

getUnreadNotificationsByUserId(userId: any): Observable<Notification[]> {
  return this.http.get<Notification[]>(`${this.notificationApiUrl}/getUnreadNotifications/${userId}`);
}

updateNotificationStatus(id: any) {
  return this.http.get(`${this.notificationApiUrl}/updateNotification/${id}`);
}

getNotificationById(id: any): Observable<Notification> {
  return this.http.get<Notification>(`${this.notificationApiUrl}/getNotificationById/${id}`);
}


getUnreadNotificationCountByUserId(userId: any) {
  return this.http.get(`${this.notificationApiUrl}/getUnreadNotificationCountByUserId/${userId}`);
}

}
