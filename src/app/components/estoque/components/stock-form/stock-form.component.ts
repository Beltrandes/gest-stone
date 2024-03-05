import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'stock-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.scss'
})
export class StockFormComponent implements OnInit {
  stockForm!: FormGroup
  @Output() save = new EventEmitter(false)
  @Output() close = new EventEmitter(false)

  closeForm() {
    this.close.emit(true)
  }

  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.stockForm = this.formBuilder.group({
      id: [],
      name: [''],
    })
  }

  onSaveStock() {
    this.save.emit(this.stockForm.value)
    console.log(this.stockForm.value)
  }

}
