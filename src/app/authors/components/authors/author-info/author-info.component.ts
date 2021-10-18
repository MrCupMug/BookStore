import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthor } from '../../../../authors/interfaces/authors.interface';
import { AuthorsService } from '../../../../authors/services/authors.service';
import { IBooksResponse } from '../../../../books/interfaces/books-response.interface';
import { IBook } from '../../../../books/interfaces/books.interface';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.scss']
})
export class AuthorInfoComponent implements OnInit, OnDestroy {

  public author!: IAuthor;
  public books!: IBook[];

  public destroy$ = new Subject<void>();

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._getAuthor();
    this._getBooks();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _getAuthor(): void {
    this._route.data
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((author) => {
        this.author = author.author;
      });
  }

  private _getBooks(): void {
    this._authorsService.getBookByAuthor(this.author.id)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((books: IBooksResponse) => {
        this.books = books.books;
      });
  }

}
