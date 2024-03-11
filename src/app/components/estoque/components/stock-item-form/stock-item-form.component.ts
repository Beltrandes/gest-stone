import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Stock } from '../../models/Stock';

@Component({
  selector: 'stock-item-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-item-form.component.html',
  styleUrl: './stock-item-form.component.scss',
})
export class StockItemFormComponent {
  @Input() formStockName: string = '';
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
  closeForm() {
    this.close.emit(true);
  }
  onSaveStockItem() {
    this.save.emit(this.stockItemForm.value);
  }
}
