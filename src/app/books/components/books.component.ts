import { Component, OnInit } from '@angular/core';

import { BooksService } from '../services/books.service';
import { IBooksCard } from '../interfaces/books-interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public bookCards: IBooksCard[] = this.booksService.getBooks();

  constructor(
              private readonly booksService: BooksService,
  ) { }

  ngOnInit() {
  }

}
