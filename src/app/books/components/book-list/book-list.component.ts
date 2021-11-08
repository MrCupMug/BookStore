import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { IBook } from '../../interfaces/books.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {

  @Input()
  public books: IBook[];

  @Input()
  public pageSizeOptions: Observable<number>;

  @Input()
  public booksMeta: any;

  @Output()
  public bookInfo = new EventEmitter<IBook>();

  @Output()
  public filter = new EventEmitter<void>();

  @Output()
  public pagination = new EventEmitter<any>();

  constructor() {}

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
