import { Component } from '@angular/core';
import { Stock } from '../../models/Stock';
import { stocks } from '../../../../shared/mocks/StockMock';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'stock-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {
  stocks: Stock[] = stocks
}
