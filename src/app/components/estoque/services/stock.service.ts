import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Stock } from '../models/Stock';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockUrl = `${environment.apiUrl}/stock`
  constructor(private http: HttpClient) { }

  getAllStocks() {
    return this.http.get<Stock[]>(this.stockUrl).pipe(first())
  }

  createStock(record: Partial<Stock>) {
    return this.http.post<Stock>(this.stockUrl, record).pipe(first())
  }
}
