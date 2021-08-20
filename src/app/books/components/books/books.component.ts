import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BooksService } from '../../services/books.service';
import { IBooksCard } from '../../interfaces/books.interface';
import { DialogWindowsComponent } from '../dialogWindows/dialog-windows.component';
import { AuthorsService } from 'src/app/authors/services/authors.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public bookCards: IBooksCard[] = this.booksService.getBooks();

  constructor(
              private readonly booksService: BooksService,
              private readonly dialog: MatDialog,
              private authorsService: AuthorsService,
  ) { }

  ngOnInit() {
  }

  public showAdditionalInfo(event: any) {

    this.dialog.open(DialogWindowsComponent, {
      data : {
        title: event.title,
        price: event.price,
        image: '../../../../assets/bookjpg',
        genre: this.getGenres(event),
        description: event.description,
        author: `${this.authorsService
          .getAuthor(event.id).first_name} ${this.authorsService.getAuthor(event.id).last_name}`,
      }
    });
  }

  public getGenres(event: any) {

    const genresArray: any = this.bookCards
      .find((el) => el.id === event.id)
        .genres;

    let genre = '';

    for (const genreEl of genresArray) {
      genre += ' ' + genreEl.name;
    }

    return genre.trim();
  }

}
