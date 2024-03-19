import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Stock } from '../../models/Stock';
import { StockItem } from '../../models/StockItem';

@Component({
  selector: 'stock-item-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-item-form.component.html',
  styleUrl: './stock-item-form.component.scss',
})
export class StockItemFormComponent implements OnInit {
  @Input() formStockName: string = '';
  @Input() formStockItemToLoad!: StockItem;
  @Input() stockToAdd!: Stock;
  @Output() close = new EventEmitter(false);
  @Output() save = new EventEmitter(false);
  stockItemForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.stockItemForm = this.formBuilder.group({
      id: [],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      details: [''],
      stock: [],
      quantity: [0, [Validators.required, Validators.min(1)]],
      minQuantity: [0],
    });
  }
  ngOnInit(): void {
    if (this.formStockItemToLoad) {
      this.stockItemForm.patchValue({
        id: this.formStockItemToLoad.id,
        name: this.formStockItemToLoad.name,
        details: this.formStockItemToLoad.details,
        quantity: this.formStockItemToLoad.quantity,
        minQuantity: this.formStockItemToLoad.minQuantity
      });
    }
  }
  closeForm() {
    this.close.emit(true);
  }
  onSaveStockItem() {
    this.save.emit(this.stockItemForm.value);
  }
}
