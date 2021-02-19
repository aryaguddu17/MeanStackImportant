import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class CompanyProfileService {

  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }

 SaveCompanyProfile(sectordta:any) {
  // var token=localStorage.getItem('user_token');
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminCompanyProfileUpdate',sectordta, httpOptions);
  }

  GetCompanyData(CompanyID:any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdmGetCompanyDetail/'+CompanyID,httpOptions);
  }

  GetCompanyTypeData() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetCompanyType', httpOptions);
  }

  

  SaveMultidata(profile:any) {
    // var token=localStorage.getItem('user_token');
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmSetEmpCompanyWorkLocation',profile, httpOptions);
  }

  GetCompanyLocationdata(Companyid,adminid) {
  
    // var token=localStorage.getItem('user_token');
 
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdminGetEmpCompanyWorkLocation/'+Companyid+'/'+adminid, httpOptions);
  }

  DeleteCompanyProfile(UserID,workLocationId,adminid) 
  {
    // var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminDeleteEmpCompanyWorkLocation/'+UserID+'/'+workLocationId+'/'+adminid, httpOptions);
  }

  GetUserProfile() {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.apiUrl + 'User/GetUserProfile', httpOptions);
  }

  CheckGstn(Gstn:any) {
    var mm={'Gstn':Gstn}
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.apiUrl + 'Account/onCheckGstn',mm, httpOptions);
  }
  
  GetFilterCompany(employeevalue:any)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/GetCompanySearchFilter', employeevalue,httpOptions);
  }

  GetAllCompany(PageNumber:number) {
   
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/GetCompanyReport/'+ PageNumber, httpOptions);
  }  

  GetDataByCompany(companyId:number,PageNumber) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/GetOpeningByCompanyId/'+ companyId+'/'+PageNumber, httpOptions);
  }  

}
