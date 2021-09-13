import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { IBook } from '../../interfaces/books.interface';
import { BookAdditionalInfoComponent } from '../book-info/book-info.component';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IGenre } from 'src/app/genres/interfaces/genres.interface';
import { AddBookComponent } from '../add-book/add-book-form/add-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  public destroy$ = new Subject<void>();

  public books: IBook[] = [];

  constructor(
    private readonly booksService: BooksService,
    private readonly dialog: MatDialog,
    private readonly authorsService: AuthorsService,
  ) { }

  ngOnInit() {
    this._loadBooks();
   }

   ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
   }

  public showAdditionalInfo(event: IBook) {
    this.authorsService.getAuthor(event.id)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.dialog.open(BookAdditionalInfoComponent, {
          data: {
            title: event.title,
            price: event.price,
            image: '../../../../assets/bookjpg',
            genre: this.getGenres(event),
            description: event.description,
            author: `${data.first_name} ${data.last_name}`,
          }
        });
      });
  }

  public getGenres(event: IBook) {
    return event.genres
      .reduce((result, current: IGenre) => {
        result += current.name + ' ';

        return result;
      }, '')
      .trim();
  }

  public showAddBookModal() {
    this.dialog.open(AddBookComponent);
  }

  private _loadBooks(): void {
    this.booksService.getBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.books = data.books;
      });
  }

}
