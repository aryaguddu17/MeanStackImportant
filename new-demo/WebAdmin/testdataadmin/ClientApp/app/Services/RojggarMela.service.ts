import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable()
export class RojggarMelaService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }
  GetAllEvent(AdminID: any) {
    //const token = sessionStorage.getItem('usertoken');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventType', httpOptions);
  }

  SaveEvent(Data: any) {
    //const token = sessionStorage.getItem('usertoken');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetEvent', Data, httpOptions);
  }
  GetEventsForEmployer(sendata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminRojgaarEventList/' + 'CURRENT' + '/' + pagenumber, httpOptions);
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminRojgaarEventList', sendata, httpOptions);
  }

  GetEmployerList(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdminGetActiveCompanyList/' + data, httpOptions);
  }

  GetCompanyData(CompanyID: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdmGetCompanyDetail/' + CompanyID, httpOptions);
  }

  GetAllUser(adminid: any, companyid: number) {//old
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdminCompanyWiseActiveUserList/' + adminid + '/' + companyid, httpOptions);
  }

  Getcontactdetaillist(companyid: any, EventId: number) {//new
    // alert(companyid)
    // alert(EventId)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventContactDetailList/' + companyid + '/' + EventId, httpOptions);
  }

  GetUserData(userid) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/AdminGetUserDetail/' + userid, httpOptions);
  }
  SetEmployerData(data: any) {
    // work on process
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetRojgaarEventEmpRegistration', data, httpOptions);
  }

  EmployerEventList(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminGetEventEmployerList', data, httpOptions);
  }

  // ******************Rajeev Jha-1174*****************
  GetEventDetail(AdminID: any, EventID: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventDetailIdWise/' + AdminID + '/' + EventID, httpOptions);
  }

  GetCandidateDetail(eventidvc) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventRegisterCandidate/' + eventidvc, httpOptions);
  }

  GetEmployerJobList(eventId, employerId) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventEmployerJobList/' + eventId + '/' + employerId, httpOptions);
  }
  GetEmployerJobDetails(jobid, employerId, eventid) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventEmployerJobDtlAndContactDtlList/' + jobid + '/' + employerId + '/' + eventid, httpOptions);
  }

  DeleteContactPerson(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminDeleteRojgaarEventContactDtl', data, httpOptions);
  }

  DeleteOpenings(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminDeleteRojgaarEventOpeningDtl', data, httpOptions);
  }

  UpdateJob(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminUpdateRojgaarEventJob', data, httpOptions);
  }

  AddUpdateContactPerson(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminUpdateRojgaarEmployerContactDetails', data, httpOptions);
  }

  AddUpdateOpening(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminUpdateRojgaarEmployerOpeningDtl', data, httpOptions);
  }


  GetContactDetail(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminViewGetEventEmployerConctactDetails', data, httpOptions);
  }

  //Event Gallery
  AddEventImage(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminEventGallaryset', data, httpOptions);
  }

  GetEventImage(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/GetAdminEventImageGallery', data, httpOptions);
  }

  DeleteImage(Data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow_origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/DeleteAdminGallery', Data, httpOptions);
  }

  SetData(Data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow_origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/SetData', Data, httpOptions);
  }

  GetData(Data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow_origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', Data, httpOptions);
  }

  AdminGetEventListWithEmployer() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventListWithEmployer' , httpOptions);
  }

  AdminGetCandidateDetailById(candidateId:any,jobOpeningId:any,eventId:any,companyId:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/AdminGetCandidateDetailById/'+candidateId+'/'+jobOpeningId+'/'+eventId+'/'+ companyId, httpOptions);
  }


}