import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { BookAdditionalInfoComponent } from './components/BookInfo/book.info.component';

import { BooksRoutingModule } from './books-routing.module';

import { CardModule } from '../card/card.module';

import { MatDialogModule } from '@angular/material/dialog';
import { AddBookComponent } from './components/add-book/add-book.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [BooksComponent, BookAdditionalInfoComponent, AddBookComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    CardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
  ],
  entryComponents: [BookAdditionalInfoComponent, AddBookComponent],
})
export class BooksModule { }
