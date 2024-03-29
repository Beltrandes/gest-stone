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
import { AddStockItemQuantity } from './models/AddStockItemQuantity';
import { StockEntry } from './models/StockEntry';
import { StockOut } from './models/StockOut';
import { Employee } from '../employee/models/Employee';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [StockListComponent, ListControlComponent, StockFormComponent, StockItemFormComponent, NgClass, AsyncPipe, StockMovementListComponent, NgIf, ReactiveFormsModule],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss'
})
export class EstoqueComponent implements OnInit {

  stocks$!: Observable<Stock[]>
  stockEntries$!: Observable<StockEntry[]>
  stockOuts$!: Observable<StockOut[]>
  employees$!: Observable<Employee[]>
  listViewType: string = 'stocks'
  isFormOpened: boolean = false
  isStockFormOpened: boolean = false
  isStockItemFormOpened: boolean = false
  formStockName: string = ''
  stockToAdd!: Stock
  toastBodyText = ''
  modalStockItem!: StockItem
  modalStockName: string = ''
  modalEmployee!: Employee | null
  withdrawModal!: FormGroup
  formStockItem!: StockItem

  constructor(private stockService: StockService, private renderer: Renderer2, private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.loadStocks()
    this.loadStockEntries()
    this.loadStockOuts()
    this.loadEmployees()
    this.withdrawModal = this.formBuilder.group({
      employeeId: [''],
      stockItemId: [''],
      quantity: [0]
    })
  }

  loadStocks() {
    this.stocks$ = this.stockService.getAllStocks()
  }
  loadStockEntries() {
    this.stockEntries$ = this.stockService.getAllStockEntries()
  }
  loadStockOuts() {
    this.stockOuts$ = this.stockService.getAllStockOuts()
  }
  loadEmployees() {
    this.employees$ = this.stockService.getAllEmployees()
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
    this.stockService.saveStockItem(stockItem).subscribe({
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

  onOpenStockItemForm(src: {stock: Stock, stockItem: StockItem | null}) {
    if(this.isFormOpened === true && this.isStockFormOpened) {
      this.closeForm()
    }
    this.formStockName = src.stock.name
    this.stockToAdd = src.stock
    if (src.stockItem != null) {
      this.formStockItem = src.stockItem
    }
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
    }, 6000)
  }
  onSaveAddStockItem(addStockItemQuantity: AddStockItemQuantity) {
    this.stockService.createStockEntry(addStockItemQuantity).subscribe({
      next: () => this.openToast('Quantidade do item atualizada com sucesso!', true),
      error: () => this.openToast('Erro ao atualizar quantidade do item!', false),
      complete: () => {
        this.loadStocks()
      }
    })
  }

  openWithdrawModal(src: { stockItem: StockItem, stockName: string }) {
    this.withdrawModal.patchValue({
      stockItemId: src.stockItem.id
    })
    this.modalStockName = src.stockName
    let withdrawModal: HTMLElement | null
    withdrawModal = document.getElementById('withdrawModal')
    this.renderer.addClass(withdrawModal, 'show')
    this.renderer.setStyle(withdrawModal, 'display', 'block')
  }

  closeWithdrawModal() {
    let withdrawModal: HTMLElement | null
    withdrawModal = document.getElementById('withdrawModal')
    this.renderer.removeClass(withdrawModal, 'show')
    this.renderer.setStyle(withdrawModal, 'display', 'none')
  }

  withdrawStockItem() {
    this.stockService.createStockOut(this.withdrawModal.value).subscribe({
      next: () => this.openToast('Itens retirados com sucesso, movimento registrado', true),
      error: (err) => {
        console.log(err)
        this.openToast('Erro ao retirar itens', false)
      },
      complete: () => {
        this.closeWithdrawModal()
        this.loadStocks()
      }
    })


  }

  onDeleteStockItem(stockItemId: string) {
    this.stockService.deleteStockItem(stockItemId).subscribe({
      next: () => this.openToast('Item excluido com sucesso', true),
      error: () => this.openToast('Erro ao excluir item', false),
      complete: () => {
        this.closeForm()
        this.loadStocks()
      }
    })
  }
}
