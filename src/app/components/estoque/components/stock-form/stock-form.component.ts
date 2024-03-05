import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { Stock } from '../../models/Stock';
import { StockItem } from '../../models/StockItem';
import { Subscription } from 'rxjs';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'stock-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.scss'
})
export class StockFormComponent implements OnInit {
  stockForm!: FormGroup
  stock: Stock | undefined
  @Input() stockId: string = ''
  @Output() save = new EventEmitter(false)
  @Output() close = new EventEmitter(false)

  private subscription: Subscription | undefined

  closeForm() {
    this.close.emit(true)
  }

  constructor(private formBuilder: FormBuilder, private stockService: StockService) {
    this.stockForm = this.formBuilder.group({
      id: [],
      name: [''],
      stockItems: this.formBuilder.array([])
    })
  }
  ngOnInit(): void {

  }

  loadStock(stockId: string) {
    this.subscription = this.stockService.getStockById(stockId).subscribe({
      next: (stock: Stock) => {
        this.stock = stock
        this.stockForm.patchValue({
          id: [stock.id],
          name: [stock.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
        })
        const stockItemFormArray = this.formBuilder.array(this.retrieveStockItems(stock), Validators.required)
        this.stockForm.setControl('stockItems', stockItemFormArray)
      },
      error: () => {
        console.log('erro ao carregar estoque')
      }
    })
  }

  onSaveStock() {
    this.save.emit(this.stockForm.value)
    console.log(this.stockForm.value)
  }

  private retrieveStockItems(stock: Stock) {
    const stockItems = []
    if (stock.stockItems.length) {
      stock.stockItems.forEach(stockItem => stockItems.push(this.createStockItem(stockItem)))
    } else {
      stockItems.push(this.createStockItem())
    }
    return stockItems
  }

  private createStockItem(stockItem: StockItem = { id: '', name: '', details: '', stock: this.stockForm.value, quantity: 0, minQuantity: 0 }) {
    return this.formBuilder.group({
      id: [stockItem.id],
      name: [stockItem.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      details: [stockItem.details],
      stock: [stockItem.stock],
      quantity: [stockItem.quantity],
      minQuantity: [stockItem.minQuantity]
    })
  }

  getStockItemsFormArray() {
    return (<UntypedFormArray>this.stockForm.get('stockItems')).controls
  }

  addNewStockItem() {
    const stockItems = this.stockForm.get('stockItems') as UntypedFormArray
    stockItems.push(this.createStockItem())
  }

  removeStockItem(index: number) {
    const stockItems = this.stockForm.get('stockItems') as UntypedFormArray
    stockItems.removeAt(index)
  }

}
