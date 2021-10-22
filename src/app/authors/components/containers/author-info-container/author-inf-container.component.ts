import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IBook } from 'src/app/books/interfaces/books.interface';

@Component({
  selector: 'app-author-inf-container',
  templateUrl: './author-inf-container.component.html',
  styleUrls: ['./author-inf-container.component.scss']
})
export class AuthorInfContainerComponent implements OnInit, OnDestroy {

  public author: IAuthor;
  public books: Observable<IBook[]>;

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
      this.books = this._authorsService.getBookByAuthor(this.author.id)
        .pipe(
          pluck('books'),
        );
  }

}
