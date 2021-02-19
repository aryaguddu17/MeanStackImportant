import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserManagementService {
  token:any;
  constructor(private httpClient: HttpClient) { 
 
  }

  UserRegistration(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/AdminUserManagement', senddata, httpOptions);
  }
  
}
