import { Component } from '@angular/core';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { ListControlComponent } from '../shared/list-control/list-control.component';
import { NgClass } from '@angular/common';
import { StockMovementListComponent } from './components/stock-movement-list/stock-movement-list.component';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [StockListComponent, ListControlComponent, NgClass, StockMovementListComponent],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss'
})
export class EstoqueComponent {


  listViewType: string = 'stocks'
  isFormOpened: boolean = false
  isStockFormOpened: boolean = false
  isStockItemFormOpened: boolean = false
  formStockName: string = ''
  changeViewType() {
    if (this.listViewType === 'stocks') {
      this.listViewType = 'movements'
    } else {
      this.listViewType = 'stocks'
    }

    console.log(this.listViewType)
  }

  onOpenForm(formName: string) {
    this.isFormOpened = true
    this.isStockFormOpened = true
    if (this.isStockItemFormOpened === true) this.isStockItemFormOpened = false
  }

  closeForm() {
    this.isFormOpened = false
    this.isStockFormOpened = false
  }

  onOpenStockItemForm(stockName: string) {
    this.formStockName = stockName
    this.isFormOpened = true
    this.isStockItemFormOpened = true
    if (this.isStockFormOpened === true) this.isStockFormOpened = false
  }
}
