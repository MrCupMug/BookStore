import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { IBook } from '../../interfaces/books.interface';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { IBooksResponse } from '../../interfaces/books-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';

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

  public dialogRef: any;

  public booksAsync: Observable<IBooksResponse>;

  public pageSizeOptions = [5, 10, 15];

  public pageEvent: PageEvent;

  public destroy$ = new Subject<void>();

  public bookInfo: IBook;

  constructor(
    private readonly _booksService: BooksService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
  ) {
   }

  public ngOnInit() {
    this._loadBooks();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openFilter(): void {
    this.dialogRef = this._dialog.open(FilterComponent);
    this._listenFiltration();
  }

  public setBookInfo(event: IBook): void {
    this.bookInfo = event;
  }

  public setPagination(event: PageEvent): void {
    const queryParams = {
      limit: event.pageSize,
      page: event.pageIndex + 1,
    };

    this._router.navigate([],
      {
        relativeTo: this._activatedRoute,
        queryParams,
        queryParamsHandling: 'merge',
      });
  }

  private _getBooks(limit: number, page: number): Observable<IBooksResponse> {
    return this._booksService.getBooksWithParams(limit, page);
  }

  private _loadBooks(): void {
    this._activatedRoute
    .queryParams
    .pipe(
      switchMap((data) => this._getBooks(data.limit, data.page)),
      takeUntil(this.destroy$),
    )
    .subscribe((data: IBooksResponse) => {
      this.booksAsync = this._booksService.getBooksWithParams(data.meta.limit, data.meta.page);
      this.booksMeta.length = data.meta.records;
      this.booksMeta.pageSize = data.meta.limit;
      this.booksMeta.pageIndex = data.meta.page;
    });
  }

  private _listenFiltration(): void {
    this.dialogRef.afterClosed()
      .subscribe((filtrationData) => {
        console.log(filtrationData);
      });
  }

}
