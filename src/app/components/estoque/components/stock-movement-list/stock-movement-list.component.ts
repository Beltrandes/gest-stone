import { Component, Input } from '@angular/core';
import { stockEntries, stockOuts } from '../../../../shared/mocks/StockMock';
import { DatePipe } from '@angular/common';
import { trigger } from '@angular/animations';

@Component({
  selector: 'stock-movement-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './stock-movement-list.component.html',
  styleUrl: './stock-movement-list.component.scss'
})
export class StockMovementListComponent {
 @Input() stockEntries = stockEntries
 @Input() stockOuts = stockOuts
}
