import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GenreComponent } from './components/container/genre-list/genre.component';

const routes: Routes = [
  {
    path: '',
    component: GenreComponent
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
export class GenresRoutingModule { }