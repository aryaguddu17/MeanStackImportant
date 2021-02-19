import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class JobApplicantReceivedService {

    constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }

    GetCandidateList(jobId:any,PageNumber:number) {
        const token = this.config.UserInfo.token;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
        return this.httpClient.get(environment.apiUrl + 'Job/GetAppliedCandidateListAplictRecvd/'+jobId + '/' + PageNumber, httpOptions);
      }

      GetAllAppliedJobs(postdata:any={}) {
        // const token = this.config.UserInfo.token;
        var token=localStorage.getItem('user_token');
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token}) };
        return this.httpClient.post(environment.rojgaarUrl + 'Job/GetAppliedJobListAplictRecvd/',postdata , httpOptions);
      }

      JobId: any = {};
      GetAppliedJobsList(JobId: any, pageNumber: number) {
        const token = this.config.UserInfo.token;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
        return this.httpClient.get(environment.apiUrl + 'Job/GetJobList/' + JobId + '/' + pageNumber, httpOptions);
      }

      GetAppliedJobById(JobId: any, PageNumber: number) {
        // const token = this.config.UserInfo.token;
        var token=localStorage.getItem('user_token'); 
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
        return this.httpClient.get(environment.rojgaarUrl + 'InterviewSchedule/GetInterviewJobList/' + JobId + '/' + PageNumber, httpOptions);
      }
      getJobByState(jobId:any,pageNo:any):Observable<any>{         
        // const token = sessionStorage.getItem('usertoken');
        var token=localStorage.getItem('user_token');
        // const token = this.config.UserInfo.token;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })};
        return this.httpClient.get(environment.rojgaarUrl + 'Job/GetJobwiseOpeningList/' + jobId + '/' + pageNo, httpOptions);
      }


      GetAppliedCandidateByState(JobId: any,jobOpeningID:any, PageNumber: number):Observable<any> {
        // const token = sessionStorage.getItem('usertoken');
        var token=localStorage.getItem('user_token');
       // const token = this.config.UserInfo.token;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
        return this.httpClient.get(environment.rojgaarUrl + 'Job/GetAppliedOpeningWiseCandidateList/' + JobId + '/' + jobOpeningID + '/' + PageNumber, httpOptions);
      }
}