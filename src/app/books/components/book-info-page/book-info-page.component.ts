import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IBook } from '../../interfaces/books.interface';

@Component({
  selector: 'app-book-info-page',
  templateUrl: './book-info-page.component.html',

  styleUrls: ['./book-info-page.component.scss']
})
export class BookInfoPageComponent implements OnInit, OnDestroy {

  public book: IBook;
  public author: IAuthor;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authorsService: AuthorsService,
  ) { }

  ngOnInit(): void {

    this._getBook();
    this._getAuthor(this.book.author_id);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _getBook(): void {
    this.route.data
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((bookArray) => {
        this.book = bookArray.book;
      });
  }

  private _getAuthor(id: number): void {
    this.authorsService.getAuthor(id)
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe((author) => {
      this.author = author;
    })
  }

}
