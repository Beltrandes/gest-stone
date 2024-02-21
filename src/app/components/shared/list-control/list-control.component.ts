import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'list-control',
  standalone: true,
  imports: [],
  templateUrl: './list-control.component.html',
  styleUrl: './list-control.component.scss'
})
export class ListControlComponent {
  @Input() title: string = ''

  @Input() iconText: string = ''

  @Input() btnText: string = ''

  @Output() open = new EventEmitter(false)


  openForm(formToOpen: string) {
    this.open.emit(formToOpen)
  }
}
