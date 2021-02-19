
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
// import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class SuggestiveSearchService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) {
  }
  Getallcompanyregisterdata(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/Getallcompanyregisterdata', senddata, httpOptions);
  }
  GetAllStates() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllState', httpOptions);
  }
  GetAllDistrict(StateID: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'Master/GetAllDistricts', StateID, httpOptions);
  }

  GetAllJobs(PushData: any = {}) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetJobList/', PushData, httpOptions);
  }
  GetFilterPia(StateiD, DistrictID, SectorID, TradeID, Pageno) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'MrigsRojgaar/GetTCdetails/' + StateiD + '/' + DistrictID + '/' + SectorID + '/' + TradeID + '/' + Pageno, httpOptions);
  }
  GetFilterCompanyRegistration(employeevalue: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/ShowCompany', employeevalue, httpOptions);
  }

  GetFilterTC(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'MrigsRojgaar/GetTrainingCentreDetail', data, httpOptions);
  }
/////////////////// For company Listing  \\\\\\\\\\\\
  GetFilterCompanyData(CompanyDetails: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminJobGetCompanyDetails', CompanyDetails, httpOptions);
  }
}