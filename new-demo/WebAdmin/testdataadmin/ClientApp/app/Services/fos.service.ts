
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { debug } from 'util';

@Injectable()
export class FosService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) {
  }
  
  FosRegistration(senddata:any) {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    return this.httpClient.post(environment.fosurl + 'User/SetData',senddata, httpOptions);
  }
 
  getFosDetails(senddata:any) {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    return this.httpClient.post(environment.fosurl + 'User/GetData',senddata, httpOptions);
  }
  // GetAllStates() {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.httpClient.get(environment.apiUrl + 'Master/GetAllState', httpOptions);
  // }
  
  // GetAllDistrict(StateID: string) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.httpClient.post(environment.apiUrl + 'Master/GetAllDistricts', StateID, httpOptions);
  //   //return this.httpClient.get(environment.apiUrl + 'Master/GetAllDistricts' +StateID, httpOptions);
  // }

}