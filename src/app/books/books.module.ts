import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { DialogWindowsComponent } from './components/dialogWindows/dialog-windows.component';

import { BooksRoutingModule } from './books-routing.module';

import { CardModule } from '../card/card.module';

import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [BooksComponent, DialogWindowsComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    CardModule,
    MatDialogModule,
  ],
  entryComponents: [DialogWindowsComponent],
})
export class BooksModule { }
