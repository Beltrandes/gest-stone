import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock } from '../../models/Stock';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddStockItemQuantity } from '../../models/AddStockItemQuantity';
import { StockItem } from '../../models/StockItem';

@Component({
  selector: 'stock-list',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent implements OnInit {

  @Output() openForm = new EventEmitter(false)
  @Output() add = new EventEmitter(false)
  @Output() withdraw = new EventEmitter(false)
  @Input() stocks: Stock[] = []
  quantity = 0;
  isQuantityInputOpened: boolean = false
  stockItemId!: string
  stockId!: string

  ngOnInit(): void {
    this.stockId = ''
    this.stockItemId = ''
  }

  openStockItemForm(stock: Stock) {
    this.openForm.emit(stock)
  }

  openQuantityInput(stockItemId: string, stockId: string) {
    this.stockItemId = stockItemId
    this.stockId = stockId
    this.isQuantityInputOpened = true
  }
  onAddStockItemQuantity() {
    const addStockItem: AddStockItemQuantity = {
      stockItemId: this.stockItemId,
      quantity: this.quantity
    }
    this.add.emit(addStockItem)
    this.closeQuantityInput(this.stockItemId, this.stockId)
  }

  closeQuantityInput(stockItemId: string, stockId: string) {
    this.stockId = ''
    this.stockItemId = ''
    this.isQuantityInputOpened = false
  }

  openWithdrawnModal(stockItem: StockItem, stockName: string) {

    this.withdraw.emit({stockItem, stockName})
    console.log('child: ' + stockItem.name)
  }
}
