import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './containers/book-list-container/book-list-container.component';
import { BooksResolverService } from './services/books-resolver.service';
import { AddBookPageComponent } from './components/add-book-page/add-book-page.component';
import { FormGuard } from './guards/form.guard';
import { BooksViewComponent } from './views/books-view/books-view.component';

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
    component: BooksViewComponent,
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
