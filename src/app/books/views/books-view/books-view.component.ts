import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBook } from '../../interfaces/books.interface';

@Component({
  selector: 'app-books-view',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.scss']
})
export class BooksViewComponent implements OnInit, OnDestroy {

  public book: IBook;

  public destroy$ = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._getBook();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _getBook(): void {
    this._activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((bookArray) => {
        this.book = bookArray.book;
      });
  }

}
