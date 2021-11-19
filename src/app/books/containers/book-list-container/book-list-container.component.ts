import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { pluck, share, switchMap, takeUntil } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { IBook } from '../../interfaces/books.interface';
import { IBooksResponse } from '../../interfaces/books-response.interface';
import { FilterComponent } from '../../components/filter/filter.component';
import { IMeta } from '../../../interfaces/meta.interface';

@Component({
  selector: 'app-book-list-container',
  templateUrl: './book-list-container.component.html',
  styleUrls: ['./book-list-container.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  public readonly meta$: Observable<IMeta>;

  public readonly books$: Observable<IBook[]>;

  public dialogRef: MatDialogRef<FilterComponent>;

  public pageSizeOptions = [5, 10, 15];

  public pageEvent: PageEvent;

  public destroy$ = new Subject<void>();

  public bookInfo: IBook;

  private _booksResponse$ = this._fetchBooksResponse();

  constructor(
    private readonly _booksService: BooksService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
  ) {
    this.books$ = this._booksResponse$
      .pipe(
        pluck('books')
      );

    this.meta$ = this._booksResponse$
      .pipe(
        pluck('meta')
      );
   }

  public ngOnInit(): void {}

  private _fetchBooksResponse(): Observable<IBooksResponse> {
    return this._activatedRoute.queryParams
    .pipe(
      switchMap((data) => this._getBooks(data)),
      share(),
    );
  }

  public ngOnDestroy(): void {
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

  private _getBooks(params: object): Observable<IBooksResponse> {
    return this._booksService.getBooks(params);
  }

  private _listenFiltration(): void {
    this.dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((filtrationData) => {

        this._router.navigate([],
          {
            relativeTo: this._activatedRoute,
            queryParams: filtrationData,
          });

      });
  }

}
