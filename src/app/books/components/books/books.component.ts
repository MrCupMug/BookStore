import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { IBook } from '../../interfaces/books.interface';
import { AddBookComponent } from '../add-book/add-book-form/add-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  public destroy$ = new Subject<void>();

  public bookInfo: IBook;

  public books: IBook[] = [];

  constructor(
    private readonly booksService: BooksService,
    private readonly dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this._loadBooks();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setBookInfo(event: IBook): void {
    this.bookInfo = event;
  }

  public showAddBookModal(): void {
    this.dialog.open(AddBookComponent);
  }

  private _loadBooks(): void {
    this.booksService.getBooks()
      .pipe(
        takeUntil(this.destroy$),
        )
      .subscribe((data) => {
        this.books = data.books;
      });
  }

}
