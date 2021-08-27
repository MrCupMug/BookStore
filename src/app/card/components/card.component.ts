import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
import { IBook } from 'src/app/books/interfaces/books.interface';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public book!: IBook;

  @Output() private bookInfo = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public showAdditionalInfo(book: IBook) {
    this.bookInfo.emit(book);
  }

}
