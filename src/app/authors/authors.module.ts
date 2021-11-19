import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorListComponent } from './components/author-list/author-list.component';
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
import { AuthorInfoComponent } from './components/author-info/author-info.component';
import { AuthorsResolverService } from './services/authors-resolver.service';
import { AuthorListContainerComponent } from './containers/author-list-container/author-list-container.component';
import { AuthorInfContainerComponent } from './containers/author-info-container/author-inf-container.component';
import { AuthorViewComponent } from './views/author-view/author-view.component';
import { TableModule } from '../table/table.module';


@NgModule({
  declarations: [
    AuthorListComponent,
    AddAuthorComponent,
    AuthorInfoComponent,
    AuthorListContainerComponent,
    AuthorInfContainerComponent,
    AuthorViewComponent],
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
    TableModule,
  ],
  providers: [AuthorsResolverService],
  entryComponents: [AddAuthorComponent],
})
export class AuthorsModule { }
