import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { BookAdditionalInfoComponent } from './components/book-info/book-info.component';

import { BooksRoutingModule } from './books-routing.module';

import { CardModule } from '../card/card.module';

import { MatDialogModule } from '@angular/material/dialog';
import { AddBookComponent } from './components/add-book/add-book-form/add-book.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GenreFormComponent } from './components/add-book/genre-form/genre-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { SizeFormComponent } from './components/add-book/size-form/size-form.component';
import { CustomFormFieldComponent } from './components/add-book/custom-form-field/custom-form-field.component';
import { CustomGenreFormComponent } from './components/add-book/custom-genre-form/custom-genre-form.component';


@NgModule({
  declarations: [
    BooksComponent,
    BookAdditionalInfoComponent,
    AddBookComponent,
    GenreFormComponent,
    SizeFormComponent,
    CustomFormFieldComponent,
    CustomGenreFormComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    CardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
  ],
  entryComponents: [BookAdditionalInfoComponent, AddBookComponent],
})
export class BooksModule { }
