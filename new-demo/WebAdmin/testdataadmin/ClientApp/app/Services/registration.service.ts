import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class RegistrationService {

  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }

  // Registration(Email: string, password: string, FirstName: string, LastName: string) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   const body = JSON.stringify({
  //     'EmailAddress': Email, 'password': password
  //     , 'FirstName': FirstName, 'LastName': LastName
  //   });
  //   return this.httpClient.post(environment.apiUrl + 'Account/UserRegistration', body, httpOptions);
  // }

  // Registration(FirstName: string, LastName: string, Email: string, PhoneNo: string,UserName: string,Password: string,LoginType: string,UserFrom: string,Pan_Number: string,Gstn: string) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   const body = JSON.stringify({
  //     'FirstName': FirstName, 'LastName': LastName
  //     , 'Email': Email, 'PhoneNo': PhoneNo, 'UserName': UserName,'Password': Password, 'LoginType': LoginType, 'UserFrom': UserFrom, 'Pan_Number': Pan_Number,'Gstn': Gstn
  //   });
  //   
  //   return this.httpClient.post(environment.apiUrl + 'Account/SaveUserDetails', body, httpOptions);
  // }

  Registration(employeevalue: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'Account/SaveUserDetails', employeevalue);
  }
  GetFilterCompanyRegistration(employeevalue: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/ShowCompany', employeevalue, httpOptions);
  }

  GetFilterCompanyRegistrationCompany(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // const body = JSON.stringify({ 'senddata': senddata });
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyFilterDetail', senddata, httpOptions);
  }


  CheckUserRegistration(RegOrEnrollNo: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'RegOrEnrollNo': RegOrEnrollNo });
    return this.httpClient.post(environment.apiUrl + 'Account/CheckUserRegistration', body, httpOptions);
  }

  GetUserRegistrationOTP(RegDetails: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'Account/GetUserRegistrationOTP', RegDetails, httpOptions);
  }

  UserRegistration(obj: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'Account/UserRegistration', obj, httpOptions);
  }
  username_verification(UserName: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //return this.httpClient.post(environment.rojgaarUrl + 'Account/onCheckUsers' ,body, httpOptions);
    const body = JSON.stringify({ 'UserName': UserName });
    return this.httpClient.post(environment.rojgaarUrl + 'Account/onCheckUsers', body, httpOptions);
  }
  ////Rajeev Jha on 14:1:19/////////
  onCheckEmail(Email: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'Email': Email });
    return this.httpClient.post(environment.rojgaarUrl + 'Account/onCheckEmail', body, httpOptions);
  }

  onCheckMobile(Mobile: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'Mobile': Mobile });
    return this.httpClient.post(environment.rojgaarUrl + 'Account/onCheckMobile', body, httpOptions);
  }

  usercheck(uservalue: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'UserName': uservalue });

    return this.httpClient.post(environment.apiUrl + 'Account/onCheckUsers', body, httpOptions);
  }

  CheckPanCard(panvalue: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'Pan': panvalue });
    return this.httpClient.post(environment.rojgaarUrl + 'Account/onCheckPanCard', body, httpOptions);
  }

  CheckGstn(gsteenvalue: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'Gstn': gsteenvalue });
    return this.httpClient.post(environment.rojgaarUrl + 'Account/onCheckGstn', body, httpOptions);
  }

  CheckMobile(mobvalue: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'Mobile': mobvalue });
    return this.httpClient.post(environment.rojgaarUrl + 'Account/onCheckMobile', body, httpOptions);
  }

  CheckEmail(emailvalues: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'Email': emailvalues });
    return this.httpClient.post(environment.rojgaarUrl + 'Account/onCheckEmail', body, httpOptions);
  }

  GenerateOTP(otvalues: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'Mobile': otvalues });
    return this.httpClient.post(environment.apiUrl + 'Account/GenerateOTP', body, httpOptions);
  }

  CheckOTP(checkotpvalues: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const body = JSON.stringify({ 'OTP': checkotpvalues });
    return this.httpClient.post(environment.apiUrl + 'Account/CheckOTP', body, httpOptions);
  }

  CreateUser(userdetails: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.config.UserInfo.token }) };
    return this.httpClient.post(environment.apiUrl + 'User/SaveUser', userdetails, httpOptions);
  }
  GetFilterCompanyData(CompanyDetails: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminJobGetCompanyDetails', CompanyDetails, httpOptions);
  }
  viewdata(companyid) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/viewdata', companyid, httpOptions);
  }

  ActiveInactiveUser(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminSetUserStatus', data, httpOptions);
  }
  ActiveInactiveCompany(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminSetCompanyStatus', data, httpOptions);
  }

  MakeDefaultCompany(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminSetUserOwnerStatus', data, httpOptions);
  }

  CompanyRegistration(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/AdminSaveUserDetails', senddata, httpOptions);
  }

  /////////////////// For add sector & trade  /////////////////
  SaveMultipleSkill(sectordta: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminSetComapanyProfileSkill', sectordta, httpOptions);
  }

  GetUserSkillDetails(companyid, adminid) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdminGetCompanyProfileSkill/' + companyid + '/' + adminid, httpOptions);
  }

  GetHiringLevel() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetHiringLevel', httpOptions);
  }

  VerifyCompany(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminCompanyVerification', data, httpOptions);
  }

  DeleteUserSkill(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminDeleteComapnyProfileSkill', data, httpOptions);
  }

  /////////////////////   Approve/Disapprove USer   ////////////////////////////////
  ApproveDisapproveUser(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminUserVerification', senddata, httpOptions);
  }


}