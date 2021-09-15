import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './components/authors/author-list/authors.component';
import { AuthorInfoComponent } from './components/authors/author-info/author-info.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent
  },
  {
    path: ':id',
    component: AuthorInfoComponent
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
export class AuthorsRoutingModule { }
