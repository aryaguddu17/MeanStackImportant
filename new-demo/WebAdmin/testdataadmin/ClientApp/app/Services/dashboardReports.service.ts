import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable()
export class DashboardReportsService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }
  jobPosted() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',}) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/AdminGetDashboardJobpostDetail', httpOptions);
  }
  applicationReceived() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',}) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/AdminGetDashboardApplicationsRecieved', httpOptions);
  }
  registeredCandidate() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',}) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/AdminGetDashboardRegistrationReceived', httpOptions);
  }
  activeJobs() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',}) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/AdminTotalActiveJob', httpOptions);
  }
  closedJobs() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',}) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/AdminTotalClosedJob', httpOptions);
  }
}