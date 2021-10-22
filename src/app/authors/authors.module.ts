import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorListComponent } from './components/views/author-list/author-list.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';

import { AuthorsRoutingModule } from './authors-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthorInfoComponent } from './components/views/author-info/author-info.component';
import { AuthorsResolverService } from './services/authors-resolver.service';
import { AuthorsComponent } from './components/containers/authors/authors.component';
import { AuthorInfContainerComponent } from './components/containers/author-info-container/author-inf-container.component';


@NgModule({
  declarations: [AuthorListComponent, AddAuthorComponent, AuthorInfoComponent, AuthorsComponent, AuthorInfContainerComponent],
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
  providers: [AuthorsResolverService],
  entryComponents: [AddAuthorComponent],
})
export class AuthorsModule { }
