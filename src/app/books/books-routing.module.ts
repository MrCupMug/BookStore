import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './components/books/books.component';
import { BookInfoPageComponent } from './components/book-info-page/book-info-page.component';
import { BooksResolverService } from './services/books-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: ':id',
    component: BookInfoPageComponent,
    resolve: { book: BooksResolverService }
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [BooksResolverService],
})
export class BooksRoutingModule { }