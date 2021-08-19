import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books.component';

import { BooksRoutingModule } from './books-routing.module';

import { CardModule } from '../card/card.module';

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    CardModule,
  ]
})
export class BooksModule { }
