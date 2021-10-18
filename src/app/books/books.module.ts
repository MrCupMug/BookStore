import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';

import { BooksRoutingModule } from './books-routing.module';

import { CardModule } from '../card/card.module';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AddBookComponent } from './components/add-book/add-book-form/add-book.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { CustomGenreFormComponent } from './components/add-book/custom-genre-form/custom-genre-form.component';
import { BookInfoPageComponent } from './components/add-book/book-info-page/book-info-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddBookPageComponent } from './components/add-book/add-book-page/add-book-page.component';
import { FormService } from './services/form.service';
import { FormGuard } from './guards/form.guard';
import { FilterComponent } from './components/filter/filter.component';
import { MatSliderModule } from '@angular/material/slider';
import { FilterService } from './services/filter.service';


@NgModule({
  declarations: [
    BooksComponent,
    AddBookComponent,
    CustomGenreFormComponent,
    BookInfoPageComponent,
    AddBookPageComponent,
    FilterComponent,
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
    MatPaginatorModule,
    MatSliderModule,
  ],
  entryComponents: [ AddBookComponent, FilterComponent ],
  providers: [
    FormService,
    FormGuard,
    FilterService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue:
    {hasBackdrop: true, disableClose: true, closeOnNavigation: true}}
  ]
})
export class BooksModule { }
