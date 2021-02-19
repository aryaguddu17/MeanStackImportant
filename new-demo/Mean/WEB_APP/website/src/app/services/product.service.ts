import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiBaseUrl: string = environment.apiBaseUrl;
    constructor(private httpClient: HttpClient) { }

    public getProducts(): any {
        return this.httpClient.get<any>(this.apiBaseUrl + 'getProducts')
            .pipe(
                catchError(this.handleError),
                map(
                    (response: any) => {
                        return response;
                    }
                )
            )
    }

    public addProduct(product: any): any {
        return this.httpClient.post<any>(this.apiBaseUrl + 'addProduct', product)
            .pipe(
                catchError(this.handleError),
                map(
                    (response: any) => {
                        return response;
                    }
                )
            )
    }

    public updateProduct(product: any): any {
        return this.httpClient.post<any>(this.apiBaseUrl + 'updateProduct', product)
            .pipe(
                catchError(this.handleError),
                map(
                    (response: any) => {
                        return response;
                    }
                )
            )
    }


    public getProductById(id: any): any {
        return this.httpClient.get<any>(this.apiBaseUrl + 'getProductById?id=' + id)
            .pipe(
                catchError(this.handleError),
                map(
                    (response: any) => {
                        return response;
                    }
                )
            )
    }

    public deleteProduct(id: any): any {
        let params = new HttpParams().set('id', '' + id);
        return this.httpClient.get<any>(this.apiBaseUrl + 'deleteProduct/' + id)
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