import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './components/authors.component';

import { AuthorsRoutingModule } from './authors-routing.module';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatTableModule,
  ]
})
export class AuthorsModule { }
