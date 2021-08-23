import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorsComponent } from './components/authors/authors.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';

import { AuthorsRoutingModule } from './authors-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AuthorsComponent, AddAuthorComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthorsRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  entryComponents: [AddAuthorComponent],
})
export class AuthorsModule { }
