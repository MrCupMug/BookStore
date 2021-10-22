import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthor } from '../../../../authors/interfaces/authors.interface';
import { AuthorsService } from '../../../../authors/services/authors.service';
import { IBook } from '../../../interfaces/books.interface';


@Component({
  selector: 'app-book-info-page',
  templateUrl: './book-info-page.component.html',
  styleUrls: ['./book-info-page.component.scss']
})
export class BookInfoPageComponent implements OnInit, OnDestroy {

  public book: IBook;
  public author: Observable<IAuthor>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _authorsService: AuthorsService,
    private readonly _location: Location,
  ) { }

  // FIXME Error
  public ngOnInit(): void {
    this._getBook();
    this._getAuthor(this.book.author_id);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goBack(): void {
    this._location.back();
  }

  private _getBook(): void {
    this._route.data
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((bookArray) => {
        this.book = bookArray.book;
      });
  }

  private _getAuthor(id: number) {
    this.author =  this._authorsService.getAuthor(id);
  }

}
