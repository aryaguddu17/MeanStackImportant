import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  token:any;
  constructor(private httpClient: HttpClient) { 
 
  }


  login(senddata:any){//used to validate username(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/AdminGetLoginDetail',senddata, httpOptions);
  }


  AdminSendSms(senddata:any){//used to send sms(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/AdminSendSms',senddata, httpOptions);
  }


  AdminCheckOTP(senddata:any){//used to verify sms(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/AdminCheckOTP',senddata, httpOptions);
  }

}
