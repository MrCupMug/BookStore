import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './components/authors.component';

import { AuthorsRoutingModule } from './authors-routing.module';


@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
  ]
})
export class AuthorsModule { }
