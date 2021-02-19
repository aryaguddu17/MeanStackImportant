
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class placedcandidateService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) {
  }

  GetPlacedcandidateReports(Adminid: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/AdminGetReportPlacedCandidate/'+ Adminid,httpOptions);
  }

  GetEmployerDetail() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdminGetEmployerDdl',httpOptions);
  }

  GetWorkLocation(companyid:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdminGetEmployerWorkLocationDdl/'+companyid,httpOptions);
  }
  //////////////////////////////////////////////
}