import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) { }


  getSummary(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/accounts/summary`);
  }


  getTransactions(accountId: string, page = 1, size = 20) {
    return this.http.get(`${environment.apiBaseUrl}/accounts/${accountId}/transactions?_page=${page}&_limit=${size}`);
  }
}