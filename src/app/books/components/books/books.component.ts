import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BooksService } from '../../services/books.service';
import { IBooksCard } from '../../interfaces/books.interface';
import { DialogWindowsComponent } from '../dialogWindows/dialog-windows.component';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IGenres } from 'src/app/genres/interfaces/genres.interface';
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  public bookCards: IBooksCard[] = [];

  private subscriptions: Array<any> = [];

  constructor(
    private readonly booksService: BooksService,
    private readonly dialog: MatDialog,
    private authorsService: AuthorsService,
  ) { }

  ngOnInit() {
    this._loadBooks();
   }

   ngOnDestroy() {
     this.subscriptions.forEach((subscription) => {
       subscription.unsubscribe();
     });
   }

  public showAdditionalInfo(event: IBooksCard) {

    const request = this.authorsService.getAuthor(event.id)
    .subscribe((data) => {
      this.dialog.open(DialogWindowsComponent, {
        data : {
          title: event.title,
          price: event.price,
          image: '../../../../assets/bookjpg',
          genre: this.getGenres(event),
          description: event.description,
          author: `${data.first_name} ${data.last_name}`,
        }
      });
    });

    this.subscriptions.push(request);
  }

  public getGenres(event: any) {
    event.genres.reduce((result, current: IGenres) => {
      result += current.name + ' ';
      return result;
    }, '').trim();
  }

  public showAddBookModal() {
    this.dialog.open(AddBookComponent);
  }

  private _loadBooks(): void {
    const request = this.booksService.getBooks().subscribe((data) => {
      this.bookCards = data.books;
    });

    this.subscriptions.push(request);
  }




}
