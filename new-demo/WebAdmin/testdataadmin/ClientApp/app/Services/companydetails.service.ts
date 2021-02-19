import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable()
export class CompanyDetailsService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) {
  }

  GetAllJobs(PushData: any = {}) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetJobList/', PushData, httpOptions);
  }

  AgencyGetAllJobs(JobId: any, pageNumber: number) {
    var token = localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Agency/GetAllAgencyJobList/' + JobId + '/' + pageNumber, httpOptions);
  }

  GetJobOpeningDetail(Jobid: any, UserId: any, AdminId: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Job/AdminGetJobOpening/' + Jobid + '/' + UserId + '/' + AdminId, httpOptions);
  }

  GetCompanyDetails(companyid: any, adminid: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/GetAdminCompanyDetail/' + companyid + '/' + adminid, httpOptions);
  }

  viewdata(companyid) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/viewdata', companyid, httpOptions);
  }

  GetAllWalkin(walkinData: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/AdminGetCandidateWalkIn/', walkinData, httpOptions);
  }

  getWalkinDetails(WalkInId: any, UserId: any, AdminId: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CandidateWalkIn/AdminGetWalkInOpening/' + WalkInId + '/' + UserId + '/' + AdminId, httpOptions);
  }

  GetFilterData(SearchData: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/AdminGetCandidateWalkIn/', SearchData, httpOptions);
  }

  GetAppByCompanyId(Data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetAppliedJobListAplictRecvdForJob', Data, httpOptions);
  }

  GetOpeningByJobId(InterviewDetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetOpeningDetailsForJob', InterviewDetail, httpOptions);
  }

  GetOpeningJobList(postdata) {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'InterviewSchedule/AdminGetInterviewJobListJob/', postdata);
  }

  GetOpeningCandidateList(postdata) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetAppliedCandidateOpeningWiseJob/', postdata, httpOptions);
  }

  viewusers(companyid) {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/viewdata', companyid, httpOptions);

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', companyid, httpOptions);
  }
  totalcount(companyid){
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/totalcount', companyid, httpOptions);

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', companyid, httpOptions);
  }
}