import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './components/genres.component';
import { GenresRoutingModule } from './genres-routing.module';


@NgModule({
  declarations: [GenresComponent],
  imports: [
    CommonModule,
    GenresRoutingModule,
  ]
})
export class GenresModule { }
