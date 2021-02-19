import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';


@Injectable()
export class AgencyjobpostService {

  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }


  GetAllJobs(postdata:any={}) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token}) };
    return this.httpClient.post(environment.apiUrl + 'Agency/GetEmployerJobList/',postdata,httpOptions);
  }

  ApplyJob(data:any={}){

    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token}) };
    return this.httpClient.post(environment.apiUrl + 'Job/SetAgencyJobApplication/' , data, httpOptions);
  }

  GetAllCandidateDetailsByjobId(PageNumber:any,jobId:any){
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token}) };
    return this.httpClient.get(environment.apiUrl + 'Agency/GetAllCandidateDetailsByjobId/'+ PageNumber+'/'+jobId ,httpOptions);
  }

}