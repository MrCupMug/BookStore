import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BooksService } from '../../services/books.service';
import { IBooksCard } from '../../interfaces/books.interface';
import { DialogWindowsComponent } from '../dialogWindows/dialog-windows.component';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IGenres } from 'src/app/genres/interfaces/genres.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public bookCards: IBooksCard[] = [];

  constructor(
    private readonly booksService: BooksService,
    private readonly dialog: MatDialog,
    private authorsService: AuthorsService,
  ) { }

  ngOnInit() {
    this._loadBooks();
   }

  public showAdditionalInfo(event: IBooksCard) {

    this.authorsService.getAuthor(event.id)
    .subscribe((data) => {
      this.dialog.open(DialogWindowsComponent, {
        data : {
          title: event.title,
          price: event.price,
          image: '../../../../assets/bookjpg',
          genre: event.genres.reduce((result, current: IGenres) => {
            result += current.name + ' ';
            return result;
          }, '').trim(),
          description: event.description,
          author: `${data.first_name} ${data.last_name}`,
        }
      });
    });
  }

  private _loadBooks(): void {
    this.booksService.getBooks().subscribe((data) => {
      this.bookCards = data.books;
    });
  }

}
