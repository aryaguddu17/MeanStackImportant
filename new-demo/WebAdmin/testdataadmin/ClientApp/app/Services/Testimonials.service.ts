import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestimonialsService {
  token:any;
  constructor(private httpClient: HttpClient) { 
 
  }

  // UserRegistration(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.rojgaarUrl + 'User/AdminUserManagement', senddata, httpOptions);
  // }
  
  TestimonialAdd(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
   // alert(JSON.stringify(senddata))
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/SetData', senddata, httpOptions);
  }


  AllTestimonialdDetails(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', senddata, httpOptions);
  }

  SetData(senddata: any) {//Use to add Admin user(Rajeev Jha-1174)
    // alert(JSON.stringify(senddata))
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
     return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/SetData', senddata, httpOptions);
   }

   GetData(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', senddata, httpOptions);
  }

  DeleteTestimonial(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/SetData', senddata, httpOptions);
  }

}
