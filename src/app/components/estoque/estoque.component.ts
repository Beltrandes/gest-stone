import { Component, OnInit, Renderer2 } from '@angular/core';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { ListControlComponent } from '../shared/list-control/list-control.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { StockMovementListComponent } from './components/stock-movement-list/stock-movement-list.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { Stock } from './models/Stock';
import { StockService } from './services/stock.service';
import { Observable } from 'rxjs';
import { StockItemFormComponent } from './components/stock-item-form/stock-item-form.component';
import { StockItem } from './models/StockItem';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [StockListComponent, ListControlComponent, StockFormComponent, StockItemFormComponent,NgClass, AsyncPipe, StockMovementListComponent, NgIf],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss'
})
export class EstoqueComponent implements OnInit {
  stocks$!: Observable<Stock[]>
  listViewType: string = 'stocks'
  isFormOpened: boolean = false
  isStockFormOpened: boolean = false
  isStockItemFormOpened: boolean = false
  formStockName: string = ''
  stockToAdd!: Stock
  toastBodyText = ''
  constructor(private stockService: StockService, private renderer: Renderer2) {

  }
  ngOnInit(): void {
    this.loadStocks()
  }
  loadStocks() {
    this.stocks$ = this.stockService.getAllStocks()
  }
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

  onSaveStock(stock: Stock) {
    this.stockService.createStock(stock).subscribe({
      next: () => this.closeForm(),
      error: () => this.openToast('Erro ao salvar estoque!', false),
      complete: () => {
        this.loadStocks()
        this.openToast('Estoque criado com sucesso!', true)
      }
    })
  }

  onSaveStockItem(stockItem: StockItem) {
    stockItem.stock = this.stockToAdd
    this.stockService.createStockItem(stockItem).subscribe({
      next: () => this.closeForm(),
      error: () => this.openToast('Erro ao salvar item de estoque!', false),
      complete: () => {
        this.loadStocks()
        this.openToast('Item de estoque criado com sucesso!', true)
      }
    })
  }

  closeForm() {
    this.isFormOpened = false
    this.isStockFormOpened = false
  }

  onOpenStockItemForm(stock: Stock) {
    this.formStockName = stock.name
    this.stockToAdd = stock
    this.isFormOpened = true
    this.isStockItemFormOpened = true
    if (this.isStockFormOpened === true) this.isStockFormOpened = false
  }

  openToast(toastBodyText: string, isSuccess: boolean) {
    let toast: HTMLElement | null
    this.toastBodyText = toastBodyText
    if (isSuccess) {
      toast = document.getElementById('successToast')

    } else {
       toast = document.getElementById('errorToast')
    }

    this.renderer.addClass(toast, 'show')
    setInterval(() => {
      this.renderer.removeClass(toast, 'show')
    }, 600)
  }

}
