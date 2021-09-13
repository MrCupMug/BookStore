import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorsComponent } from './components/authors/author-list/authors.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';

import { AuthorsRoutingModule } from './authors-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthorInfoComponent } from './components/authors/author-info/author-info.component';


@NgModule({
  declarations: [AuthorsComponent, AddAuthorComponent, AuthorInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthorsRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  entryComponents: [AddAuthorComponent],
})
export class AuthorsModule { }
