import { StockEntry } from './../../models/StockEntry';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { StockOut } from '../../models/StockOut';

@Component({
  selector: 'stock-movement-list',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './stock-movement-list.component.html',
  styleUrl: './stock-movement-list.component.scss'
})
export class StockMovementListComponent implements OnInit {
 @Input() stockEntries!: StockEntry[]
 @Input() stockOuts!: StockOut[]

 ngOnInit(): void {
     console.log(this.stockEntries)
 }

}
