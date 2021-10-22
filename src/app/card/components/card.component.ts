import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { IBook } from '../../books/interfaces/books.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  @Input()
  public book!: IBook;

  @Output()
  private readonly bookInfo = new EventEmitter<IBook>();

  constructor() { }

  public showAdditionalInfo(book: IBook): void {
    this.bookInfo.emit(book);
  }

}
