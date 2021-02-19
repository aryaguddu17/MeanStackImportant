import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OfferletterReleasedService {
  token:any;
  constructor(private httpClient: HttpClient) { 
 
  }

  GetDataCandidateoffered(Data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow_origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', Data, httpOptions);
  }
}
