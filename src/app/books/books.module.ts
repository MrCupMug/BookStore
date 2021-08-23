import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { DialogWindowsComponent } from './components/dialogWindows/dialog-windows.component';

import { BooksRoutingModule } from './books-routing.module';

import { CardModule } from '../card/card.module';

import { MatDialogModule } from '@angular/material/dialog';
import { AddBookComponent } from './components/add-book/add-book.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BooksComponent, DialogWindowsComponent, AddBookComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    CardModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  entryComponents: [DialogWindowsComponent, AddBookComponent],
})
export class BooksModule { }
