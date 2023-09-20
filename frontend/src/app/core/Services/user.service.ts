import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UAEHead, UserModel } from '../interfaces/userModel';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  authApiURL = environment.apiUrl + '/v1/users';

  logIn(inputdata: any) {
    return this.http.post(`${this.authApiURL}/login`, inputdata);
  }

  register(inputdata: any) {
    return this.http.post(`${this.authApiURL}/register`, inputdata);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token') != null
      ? localStorage.getItem('token')
      : '';
  }

  addUser(inputdata: any) {
    return this.http.post(`${this.authApiURL}/register`, inputdata);
  }

  getUserByID(inputdata: any): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.authApiURL}/getUser/${inputdata}`);
  }

  changePassword(inputdata: any) {
    return this.http.patch(`${this.authApiURL}/changePassword`, inputdata);
  }

  addTimeForm(inputdata: any) {
    return this.http.post(`${this.authApiURL}/addTimeForm`, inputdata);
  }

  getTimeFormsById(inputdata: any) {
    return this.http.get(`${this.authApiURL}/getTimeFormsById/${inputdata}`);
  }

  getID() {
    const token = this.getToken();
    const parts = token!.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const userID = parseInt(payload.id);
    return userID;
  }

  getTalentUserIdNames() {
    return this.http.get(`${this.authApiURL}/getTalentUserIdNames`);
  }

  getRole() {
    const token = this.getToken();
    const parts = token!.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const userRole = payload.role;
    return userRole;
  }

  getPrivilegeLevel() {
    const token = this.getToken();

    if (token && token.startsWith('Bearer ')) {
      var jwt = token.substring(7);
      var parts = jwt.split('.');
      var payload = JSON.parse(atob(parts[1]));
      var userPrivilege_level = payload.privilege_level;
    }
    return userPrivilege_level;
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.authApiURL}/getAllUsers`);
  }

  getUserNameById(inputdata: any): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.authApiURL}/getUserNameById/${inputdata}`);
  }

  updateUser(inputdata: any, id: any) {
    return this.http.patch(`${this.authApiURL}/updateUser/${id}`, inputdata);
  }

  resetCount(id: any) {
    return this.http.get(`${this.authApiURL}/resetCount/${id}`);
  }

  resetPassword(id :any) {
    return this.http.get(`${this.authApiURL}/resetPassword/${id}`);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.authApiURL}/deleteUser/${id}`);
  }

  getTalentHeads(){
    return this.http.get(`${this.authApiURL}/getTalentHeads`);
  }

  getKSAHeads(): Observable<number[]>{
    return this.http.get<number[]>(`${this.authApiURL}/getKSAHeads`);
  }

  getUAEHead(): Observable<UAEHead>{
    return this.http.get<UAEHead>(`${this.authApiURL}/getUAEHead`);
  }

  addTalentHead(id :any) {
    return this.http.get(`${this.authApiURL}/addTalentHead/${id}`);
  }

  removeTalentHead(id :any) {
    return this.http.get(`${this.authApiURL}/removeTalentHead/${id}`);
  }

  goOnLeave(id :any) {
    return this.http.get(`${this.authApiURL}/goOnLeave/${id}`);
  }

  returnFromLeave(id :any) {
    return this.http.get(`${this.authApiURL}/returnFromLeave/${id}`);
  }
}
