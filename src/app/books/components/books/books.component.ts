import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { IBook } from '../../interfaces/books.interface';
import { AddBookComponent } from '../add-book/add-book-form/add-book.component';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { IBooksResponse } from '../../interfaces/books-response.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  public booksMeta = {
    length: 100,
    pageSize: 10,
    pageIndex: 1,
  };

  public pageSizeOptions = [5, 10, 15];

  public pageEvent: PageEvent;

  public destroy$ = new Subject<void>();

  public bookInfo: IBook;

  public books: IBook[] = [];

  constructor(
    private readonly booksService: BooksService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.activatedRoute
      .queryParams
      .pipe(
        switchMap((data) => this._getBooks(data.limit, data.page)),
        takeUntil(this.destroy$),
      )
      .subscribe((data: IBooksResponse) => {
        this.books = data.books;
        this.booksMeta.length = data.meta.records;
        this.booksMeta.pageSize = data.meta.limit;
        this.booksMeta.pageIndex = data.meta.page;
      });

  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setBookInfo(event: IBook): void {
    this.bookInfo = event;
  }

  public setPagination(event: PageEvent): void {
    const queryParams = {
      limit: event.pageSize,
      page: event.pageIndex + 1,
    };

    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge',
      });
  }

  public showAddBookModal(): void {
    this.dialog.open(AddBookComponent);
  }

  private _getBooks(limit: number, page: number): Observable<IBooksResponse> {
    return this.booksService.getBooksWithParams(limit, page);
  }

}
