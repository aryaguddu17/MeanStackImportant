import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class EventService {
    constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }
    GetAllEvent(AdminID: any) {

        //const token = sessionStorage.getItem('usertoken');
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventType/', httpOptions);
      }
    SaveEvent(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetEvent', Data, httpOptions);
    }


    RegisteredEventList(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminRojgaarEventList',Data, httpOptions);
    }

    GetEventDetailIdWise(AdminID: any,EventID:any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
        return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventDetailIdWise/'+AdminID+'/'+EventID, httpOptions);
    }

    UpdateCordinaterEventData(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetEventCoordinatorDetails', Data, httpOptions);
    }

    UpdatePosterEvent(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetEventPoster', Data, httpOptions);
    }
    UpdateFacilitedEvent(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetEventsFacilatedby', Data, httpOptions);
    }


    DeleteCordinaterEventData(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminDeleteRojgaarEventCoordinator', Data, httpOptions);
    }
    UpdateGuestEventData(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminSetEventChiefGuest', Data, httpOptions);
    }
 
    UpdateEvent(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminUpdateEvent', Data, httpOptions);
    }


    DeleteGuestEventData(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminDeleteRojgaarEventChiefGuest', Data, httpOptions);
    }

    DeletePosterEventData(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminDeleteRojgaarventPoster', Data, httpOptions);
    }

    DeleteFacilitedEventData(Data: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post(environment.rojgaarUrl + 'Event/AdminDeleteRojgaarventFacilatedby', Data, httpOptions);
    }
}