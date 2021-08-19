import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBooksCard } from 'src/app/books/interfaces/books-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public book!: IBooksCard;

  @Output() private outputBook = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public showAdditionalInfo(book: IBooksCard): void {
    this.outputBook.emit(book);
  }

}