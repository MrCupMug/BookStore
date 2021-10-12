import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './components/genres.component';
import { GenresRoutingModule } from './genres-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GenresComponent],
  imports: [
    CommonModule,
    GenresRoutingModule,
    FormsModule,
  ]
})
export class GenresModule { }
