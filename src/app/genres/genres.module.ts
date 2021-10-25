import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GenreListComponent } from './components/genre/genre-list.component';

import { GenresRoutingModule } from './genres-routing.module';
import { GenreListContainerComponent } from './containers/genre-list-container/genre-list-container.component';

@NgModule({
  declarations: [GenreListComponent, GenreListContainerComponent],
  imports: [
    CommonModule,
    GenresRoutingModule,
    FormsModule,
  ]
})
export class GenresModule { }
