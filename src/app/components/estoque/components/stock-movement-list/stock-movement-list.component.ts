import { Component, Input } from '@angular/core';
import { stockEntries, stockOuts } from '../../../../shared/mocks/StockMock';

@Component({
  selector: 'stock-movement-list',
  standalone: true,
  imports: [],
  templateUrl: './stock-movement-list.component.html',
  styleUrl: './stock-movement-list.component.scss'
})
export class StockMovementListComponent {
 @Input() stockEntries = stockEntries
 @Input() stockOuts = stockOuts
}
