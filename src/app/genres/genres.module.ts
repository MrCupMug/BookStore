import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GenreListComponent } from './components';

import { GenresRoutingModule } from './genres-routing.module';
import { GenreComponent } from './components/container/genre-list/genre.component';

@NgModule({
  declarations: [GenreListComponent, GenreComponent],
  imports: [
    CommonModule,
    GenresRoutingModule,
    FormsModule,
  ]
})
export class GenresModule { }
