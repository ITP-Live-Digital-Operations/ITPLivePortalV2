import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

notificationApiUrl = environment.apiUrl + 'v1/notifications';

constructor(private http: HttpClient) { }

createNotification(input: any) {
  return this.http.post(this.notificationApiUrl, input);
}

getNotificationsByUserId(userId: any) {
  return this.http.get(`${this.notificationApiUrl}/getNotifications/${userId}`);
}

getUnreadNotificationsByUserId(userId: any) {
  return this.http.get(`${this.notificationApiUrl}/getUnreadNotifications/${userId}`);
}

updateNotificationStatus(id: any) {
  return this.http.get(`${this.notificationApiUrl}/updateNotification/${id}`);
}



}
