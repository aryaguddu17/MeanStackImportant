import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AppConst } from '../constant/app.constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  BaseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getUserList(data: any): Observable<any> {
    data.page = data.page.toString()
    data.count = data.count.toString()
    return this.http.post(AppConst.getUserList, data);
  }
 
  getUserFbData(data: any): Observable<any> {
    return this.http.post(AppConst.getUserFbData, data);
  }
  getUserFbPages(data: any): Observable<any> {
    return this.http.post(AppConst.getUserFbPages, data);
  }
  
  getUserFbPostedData(data: any): Observable<any> {
    return this.http.post(AppConst.getUserFbPostedData, data);
  }
  
  getUserFbInboxs(data: any): Observable<any> {
    return this.http.post(AppConst.getUserFbInboxs, data);
  }
  getUserByUserOrgId(data: any): Observable<any> {
    return this.http.post(AppConst.getUserByUserOrgId, data);
  }

  updateUser(data: any): Observable<any> {
    return this.http.post(AppConst.updateUser, data);
  }
  getDesignation(): Observable<any> {
    return this.http.get(AppConst.getDesignation);
  }
  setUserAccess(data: any): Observable<any> {
    return this.http.post(AppConst.setUserAccess, data);
  }
  getPerByUserOrgId(data: any): Observable<any> {
    return this.http.post(AppConst.getPerByUserOrgId, data);
  }
  updateUserPermission(data: any): Observable<any> {
    return this.http.post(AppConst.updateUserPermission, data);
  }
  deleteUserByUserOrgId(data, userPerId): Observable<any> {
    let permissionObj = { p: userPerId, m: 'users', a: 'delete' }
    let headers = new HttpHeaders()
    headers = headers.append("authentication", JSON.stringify(permissionObj));
    return this.http.delete(AppConst.deleteUserByUserOrgId + '/' + data.id);
  }
  getTimezoneList(): Observable<any> {
    return this.http.get(AppConst.getTimezoneList);
  }
  getWorkspaceWithEmail(data: any): Observable<any> {
    return this.http.post(AppConst.getWorkspaceWithEmail, data);
  }
  getNotifySetting(data: any): Observable<any> {
    return this.http.post(AppConst.getNotifySetting, data);
  }
  getUserOrgList(data: any): Observable<any> {
    return this.http.post(AppConst.getUserOrgList, data);
  }
  getMembers(data: any): Observable<any> {
    return this.http.post(AppConst.getMembers, data);
  }

  getOrgConsent(data: any): Observable<any> {
    return this.http.get(AppConst.getOrgConsent + '/' + data.id);
  }
  loggedin(): Observable<any> {
    return this.http.get(AppConst.loggedin);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.post(AppConst.updateProfile, data);
  }
  uploadImage(data: any): Observable<any> {
    return this.http.post(AppConst.uploadImage, data);
  }
  changePassword(data: any): Observable<any> {
    return this.http.post(AppConst.changePassword, data);
  }
  updateLinkEmail(data: any): Observable<any> {
    return this.http.post(AppConst.updateLinkEmail, data);
  }
  sendWorkspaceInvite(data: any): Observable<any> {
    return this.http.post(AppConst.sendWorkspaceInvite, data);
  }
  updateNotificationPerm(data: any): Observable<any> {
    return this.http.post(AppConst.updateNotificationPerm, data);
  }
  forgetMe(data: any): Observable<any> {
    return this.http.post(AppConst.forgetMe, data);
  }
  getExportData(data: any): Observable<any> {
    return this.http.post(AppConst.getExportData, data);
  }
  removeOrgConsent(data): Observable<any> {
    return this.http.post(AppConst.removeOrgConsent, data);

  }

  getUnreadNotificationCount(data): Observable<any> {
    return this.http.post(AppConst.getUnreadNotificationCount, data);

  }
  getNotificationList(data): Observable<any> {
    return this.http.post(AppConst.getNotificationList, data);

  }
  readNotification(data): Observable<any> {
    return this.http.post(AppConst.readNotification, data);

  }
  getAllNotificationList(data): Observable<any> {
    return this.http.post(AppConst.getAllNotificationList, data);

  }
  deleteNotification(data): Observable<any> {
    return this.http.post(AppConst.deleteNotification, data);
  }

  setOrganization(data): Observable<any> {
    return this.http.post(AppConst.setOrganization, data);
  }
}
