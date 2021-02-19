import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GovJobService {
  token: any;
  constructor(private httpClient: HttpClient) {

  }

  AdminSetGovJob(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // alert(JSON.stringify(senddata));
    //return false;
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminSetGovJob', senddata, httpOptions);
  }

  GetQualification(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Master/GetGovEducation', senddata, httpOptions);
  }

  GetGovDepartment(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Master/GetGovDepartment', senddata, httpOptions);
  }

  GetGovIndustryArea(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Master/GetGovIndustryArea', senddata, httpOptions);
  }

  GetGovJob(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    //alert(JSON.stringify(senddata));
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Job/GetGovJob/' + 0, httpOptions);
  }

  GetGovJobPostById(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    //alert(JSON.stringify(senddata));
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Job/GetGovJobPostById/' + senddata, httpOptions);
  }


  PostGovJobToYs(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    //alert(JSON.stringify(senddata));
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Job/PostGovJobToYs/' + senddata, httpOptions);
  }


  SetGovIndustryDepartmentQualification(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Master/SetGovIndustryDepartmentQualification', senddata, httpOptions);
  }

  
  GetGovJobPostHtml(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    //alert(JSON.stringify(senddata));
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Job/GetGovJobPostHtml/' + senddata, httpOptions);
  }

}
