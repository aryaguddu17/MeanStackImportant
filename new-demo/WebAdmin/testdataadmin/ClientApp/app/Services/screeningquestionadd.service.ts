import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ScreeningQuestionService {

  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }

  GetFilterCompanyDataforAppReceived(CompanyDetails: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyScreening', CompanyDetails, httpOptions);
  }
  GetAllDistrict(StateID: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllDistricts/' + StateID, httpOptions);
  }
  GetAllStates() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllState', httpOptions);
  }


  getGroupList(CompanyId: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'UserQuestionsAns/AdmGetquestiongroup/' + CompanyId + '', httpOptions);
  }




  getscreeningQuestion(groupId: any, adminId: any, userId: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'UserQuestionsAns/AdminGetquestionlist/' + groupId + '/' + adminId + '/' + userId + '', httpOptions);
  }



  setScreeningQuestion(questionObj) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'UserQuestionsAns/AdmSetMastergroup', questionObj, httpOptions);
  }

  saveGroup(groupObject) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'UserQuestionsAns/AdmSetgroup', groupObject, httpOptions);

  }


  activeDeactiveQuestion(Adminid, obj) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'UserQuestionsAns/AdmGroupstatuschange/' + Adminid + '', obj, httpOptions);

  }

  Getallpreference() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllPreference', httpOptions);
  }

  SetGroupStatus(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/SetData', data, httpOptions);
    // rojgaarapiUrl
  }

}
