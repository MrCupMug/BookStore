import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './components/genres.component';
import { GenresRoutingModule } from './genres-routing.module';
import { FlagValidatorDirective } from './validators/flag-validator.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GenresComponent, FlagValidatorDirective],
  imports: [
    CommonModule,
    GenresRoutingModule,
    FormsModule,
  ]
})
export class GenresModule { }
