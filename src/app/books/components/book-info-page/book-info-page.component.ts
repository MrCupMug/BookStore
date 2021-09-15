import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  public book: IBook;
  public author: IAuthor;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) { }

  ngOnInit(): void {

    this._getBook();
    this._getAuthor(this.book.author_id);
  }

  private _getBook(): void {
    this.route.data
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((bookArray) => {
        this.book = bookArray.book;
      });
  }

  private _getAuthor(id: number): void {
    this.authorsService.getAuthor(id)
    .pipe(
      takeUntil(this._destroy$),
    )
    .subscribe((author) => {
      this.author = author;
    })
  }

}
