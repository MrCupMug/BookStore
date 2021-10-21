import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { IBook } from '../../../../books/interfaces/books.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  @Input()
  public books: Observable<IBook[]>;

  @Input()
  public pageSizeOptions: Observable<number>;

  @Output()
  public bookInfo = new EventEmitter<IBook>();

  @Output()
  public filter = new EventEmitter<void>();

  @Output()
  public pagination = new EventEmitter<any>();

  public booksMeta = {
    length: 100,
    pageSize: 10,
    pageIndex: 1,
  };

  constructor() { }

  public setBookInfo(book: IBook): void {
    this.bookInfo.emit(book);
  }

  public openFilter(): void {
    this.filter.emit();
  }

  public setPagination(pagination: PageEvent): void {
    this.pagination.emit(pagination);
  }

}
