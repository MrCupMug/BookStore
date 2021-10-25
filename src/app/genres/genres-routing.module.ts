import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GenreListContainerComponent } from './containers/genre-list-container/genre-list-container.component';

const routes: Routes = [
  {
    path: '',
    component: GenreListContainerComponent
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
