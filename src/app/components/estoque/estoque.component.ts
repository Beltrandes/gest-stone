import { Component, OnInit, Renderer2 } from '@angular/core';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { ListControlComponent } from '../shared/list-control/list-control.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { StockMovementListComponent } from './components/stock-movement-list/stock-movement-list.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { Stock } from './models/Stock';
import { StockService } from './services/stock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [StockListComponent, ListControlComponent, StockFormComponent, NgClass, AsyncPipe, StockMovementListComponent, NgIf],
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
  toastBodyText = ''
  constructor(private stockService: StockService, private renderer: Renderer2) {

  }
  ngOnInit(): void {
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
      error: (err) => this.openToast('Erro ao salvar estoque!', false),
      complete: () => {
        this.openToast('Estoque criado com sucesso!', true)
      }
    })
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
    }, 20000)
  }

}
