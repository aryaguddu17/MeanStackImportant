import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  Todo_Add(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'Todo_Add', data)
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }

  Todo_Get(): Observable<any> {
    return this.httpClient.get<any>(this.apiBaseUrl + 'Todo_Get')
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }
  Inbox_Get(data:any): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'inbox',data)
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }
  getUserFbPostedData(data:any): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'publishpost',data)
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }

  Todo_Update(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'Todo_Update', data)
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }

  Todo_Delete(id: any): Observable<any> {
    let params = new HttpParams().set('id', '' + id);
    return this.httpClient.get<any>(this.apiBaseUrl + 'Todo_Delete/' + id)
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }

  CSV_Upload(formData: any) {
    return this.httpClient.post<any>(this.apiBaseUrl + 'csvFile', formData)
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }

  Insert_Csv() {
    return this.httpClient.get<any>(this.apiBaseUrl + 'uploadCsv')
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
