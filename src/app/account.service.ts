import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Account } from './model/account';
import { catchError } from 'rxjs/internal/operators';

const endPoint = "http://localhost:8080/customer";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllAccount() {
    return this.http.get(`${endPoint}/allCustomers`).pipe(
      catchError(this.handleError)
    )
  }

  public getAccountById(id: number) {
    return this.http.get(`${endPoint}/getCustomer/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  public updateAccount(id: number, account: Account) {
    return this.http.put(`${endPoint}/editCustomer/${id}`, account).pipe(
      catchError(this.handleError)
    )
  }

  public createAccount(account: Account) {
    return this.http.post(`${endPoint}/createCustomerAccount`, account).pipe(
      catchError(this.handleError)
    )
  }

  public deleteAccount(id: number) {
    return this.http.delete(`${endPoint}/deleteCustomer/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
