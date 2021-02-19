import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreateEventTypeService {
  token:any;
  constructor(private httpClient: HttpClient) { 
 
  }

  CreateETR(senddata:any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetUpdateMdEventType',senddata, httpOptions);
  }


  UpdateCET(senddata:any){
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetUpdateMdEventType',senddata, httpOptions);
  }


  SearchCreateETlist(sendsearchdata:any){
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminGetAllEventType',sendsearchdata,httpOptions);
   }



  Incativeeventtype(senddata:any){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetEventTypeStatus',senddata, httpOptions);
  }


  // GetJobOpening(jobopeningdetail: any, JobId: any, adminid: any, userid: any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminSaveJobOpening/' + JobId + '/' + userid + '/' + adminid, jobopeningdetail, httpOptions);
  // }

}
