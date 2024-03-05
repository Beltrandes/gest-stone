import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock } from '../../models/Stock';
import { stocks } from '../../../../shared/mocks/StockMock';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'stock-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent implements OnInit {


  @Output() openForm = new EventEmitter(false)
  @Input() stocks: Stock[] = []

  isQuantityInputOpened: boolean = false
  stockItemId!: string
  stockId!: string

  ngOnInit(): void {
    this.stockId = ''
    this.stockItemId = ''
  }

  openStockItemForm(stockName: string) {
    this.openForm.emit(stockName)
  }

  openQuantityInput(stockItemId: string, stockId: string) {
    this.stockItemId = stockItemId
    this.stockId = stockId
    this.isQuantityInputOpened = true
  }
  closeQuantityInput(stockItemId: string, stockId: string) {
    this.stockId = ''
    this.stockItemId = ''
    this.isQuantityInputOpened = false
  }
}
