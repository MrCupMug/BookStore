import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { CardService } from 'src/app/card/services/card.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-dialog-windows',
  templateUrl: './book.info.component.html',
  styleUrls: ['./book.info.component.scss']
})
export class BookAdditionalInfoComponent implements OnInit {

  constructor(
              @Inject(MAT_DIALOG_DATA) public data,
              private readonly dialog: MatDialog,
              private readonly authorsService: AuthorsService,
              private readonly cardService: CardService,
              private readonly booksService: BooksService,
  ) { }

  ngOnInit() { }

}
