import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './components/books/books.component';
import { BookInfoPageComponent } from './components/book-info-page/book-info-page.component';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: ':id',
    component: BookInfoPageComponent
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class BooksRoutingModule { }