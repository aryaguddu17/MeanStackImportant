import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UpdateprofileService {

  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }
  GetUserProfile(jobdetail:any) {
    // alert("tiwari");
    // const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.apiUrl + 'CompanyView/states', httpOptions);
  }

  GetUserProfileall(senddata:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    return this.httpClient.post(environment.apiUrl + 'CompanyView/getCompanyDetails',senddata, httpOptions);
  }

  GetProfileDetailsForAdmin(candiID:any) {
    // var admin_id=1;
    // const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };   
     return this.httpClient.post(environment.apiUrl + 'CompanyView/viewcompany',candiID, httpOptions);
  }
  getGSTPAN(candiID:any)
  {
    // alert(candiID);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    return this.httpClient.post(environment.apiUrl + 'CompanyView/pangstfetch',candiID, httpOptions);

  }

  sendPANGST(pangst:any)
  {
    // alert("HHHHHHHHHHHHHHHHHHHHH");
    // var arr = pangst.split(" ")
    // alert(pangst);
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) }; 
    return this.httpClient.post(environment.apiUrl + 'CompanyView/pangstsend', pangst, httpOptions);
  }
  UpdateProfile(alldata:any)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    return this.httpClient.post(environment.apiUrl + 'CompanyView/UpdateProfile',alldata, httpOptions);
  }
  GetAllStates()
  {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    
    return this.httpClient.get(environment.apiUrl + 'CompanyView/GetAllState', httpOptions);
    
  }
  GetAllDistricts(dist:any)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    return this.httpClient.get(environment.apiUrl + 'CompanyView/GetAllDistricts', httpOptions);
  }

  CompanyProfileStatusReport() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdminCompanyStatusReport', httpOptions);
  }


}
