import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Stock } from '../models/Stock';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { StockEntry } from '../models/StockEntry';
import { AddStockItemQuantity } from '../models/AddStockItemQuantity';
import { StockOut } from '../models/StockOut';
import { WithdrawStockItem } from '../models/WithdrawStockItem';
import { StockItem } from '../models/StockItem';
import { Employee } from '../../employee/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockUrl = `${environment.apiUrl}/stock`
  employeeUrl = `${environment.apiUrl}/employee`
  constructor(private http: HttpClient) { }

  getAllStocks() {
    return this.http.get<Stock[]>(this.stockUrl).pipe(first())
  }
  getStockById(id: string) {
    return this.http.get<Stock>(`${this.stockUrl}/${id}`).pipe(first())
  }
  saveStock(record: Partial<Stock>) {
    if (record.id) {
      return this.updateStock(record)
    }
    return this.createStock(record)
  }
  createStock(record: Partial<Stock>) {
    return this.http.post<Stock>(this.stockUrl, record).pipe(first())
  }
  updateStock(record: Partial<Stock>) {
    return this.http.put<Stock>(`${this.stockUrl}/${record.id}`, record).pipe(first())
  }
  deleteStock(id: string) {
    return this.http.delete<Stock>(`${this.stockUrl}/${id}`).pipe(first())
  }

  getAllStockItems() {
    return this.http.get<StockItem[]>(`${this.stockUrl}/item`).pipe(first())
  }
  getStockItemById(id: string) {
    return this.http.get<StockItem>(`${this.stockUrl}/item/${id}`).pipe(first())
  }
  saveStockItem(record: Partial<StockItem>) {
    if (record.id) {
      return this.updateStockItem(record)
    }
    return this.createStockItem(record)

  }
  private createStockItem(record: Partial<StockItem>) {
    return this.http.post<StockItem>(`${this.stockUrl}/item`, record).pipe(first())
  }
   private updateStockItem(record: Partial<StockItem>) {
    return this.http.put<StockItem>(`${this.stockUrl}/item/${record.id}`, record).pipe(first())
  }
  deleteStockItem(id: string) {
    return this.http.delete<StockItem>(`${this.stockUrl}/item/${id}`).pipe(first())
  }

  getAllStockEntries() {
    return this.http.get<StockEntry[]>(`${this.stockUrl}/entry`).pipe(first())
  }
  createStockEntry(data: AddStockItemQuantity) {
    return this.http.post<AddStockItemQuantity>(`${this.stockUrl}/entry`, data).pipe(first())
  }

  getAllStockOuts() {
    return this.http.get<StockOut[]>(`${this.stockUrl}/out`).pipe(first())
  }
  createStockOut(data: WithdrawStockItem) {
    return this.http.post<WithdrawStockItem>(`${this.stockUrl}/out`, data).pipe(first())
  }

  // TODO: tirar esse método daqui
  getAllEmployees() {
    return this.http.get<Employee[]>(this.employeeUrl).pipe(first())
  }
}
