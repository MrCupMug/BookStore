import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './components/containers/books/books.component';
import { BookInfoPageComponent } from './components/add-book/book-info-page/book-info-page.component';
import { BooksResolverService } from './services/books-resolver.service';
import { AddBookPageComponent } from './components/add-book/add-book-page/add-book-page.component';
import { FormGuard } from './guards/form.guard';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'add-book',
    component: AddBookPageComponent,
    canDeactivate: [FormGuard]
  },
  {
    path: ':id',
    component: BookInfoPageComponent,
    resolve: { book: BooksResolverService },
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