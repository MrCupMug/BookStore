import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IBook } from 'src/app/books/interfaces/books.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  public book!: IBook;

  @Output()
  private bookInfo = new EventEmitter<IBook>();

  constructor() { }

  public showAdditionalInfo(book: IBook) {
    this.bookInfo.emit(book);
  }

}
