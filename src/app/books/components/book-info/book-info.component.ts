import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { IBook } from 'src/app/books/interfaces/books.interface';

@Component({
  selector: 'app-book-info-view',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent {

  @Input()
  public book: IBook;

  @Input()
  public author!: IAuthor;

  @Output()
  public locationBack = new EventEmitter<void>();

  constructor() { }

  public goBack(): void {
    this.locationBack.emit();
  }

}
