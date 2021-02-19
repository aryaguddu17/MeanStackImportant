import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiBaseUrl: string = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }
    
  getAdminDashboardCount(): Observable<any> {
    return this.httpClient.get<any>(this.apiBaseUrl + 'Todo_Get')
      .pipe(
        catchError(this.handleError),
        map(
          (response: any) => {
            let todoNewItems = [];
            let todoInProgressItems = [];
            let todoCompletedItems = [];
            response.objResponse.data.forEach((item, index) => {
              if (item.status === 'new') {
                todoNewItems.push(item)
              } else if (item.status === 'inProgress') {
                todoInProgressItems.push(item)
              } else {
                todoCompletedItems.push(item)
              }
            })
            response.objResponse.todoNewItems = todoNewItems;
            response.objResponse.todoInProgressItems = todoInProgressItems;
            response.objResponse.todoCompletedItems = todoCompletedItems;
            return response;
          }
        )
      )
  }
  
  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}

