import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IBook } from '../../interfaces/books.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-info-page',
  templateUrl: './book-info-page.component.html',
  styleUrls: ['./book-info-page.component.scss']
})
export class BookInfoPageComponent implements OnInit {

  public id: number;

  public book: IBook;
  public author: IAuthor;

  private _destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this._getBookAndAuthor();
  }

  private _getBookAndAuthor(): void {
    this.booksService.getBookById(this.id)
      .pipe(
        tap((book) => this.book = book),
        switchMap((book: IBook) => {
          return this._getAuthor(book.author_id);
        }),
        catchError((error) => {
          console.log(error);
          return [];
        }),
        takeUntil(this._destroyed$),
      )
      .subscribe((author: IAuthor) => {
        this.author = author;
      });
  }

  private _getAuthor(id: number): Observable<IAuthor> {
    return this.authorsService.getAuthor(id);
  }

}
