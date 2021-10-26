import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './containers/book-list-container/book-list-container.component';

import { BooksRoutingModule } from './books-routing.module';

import { CardModule } from '../card/card.module';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AddBookComponent } from './components/add-book-form/add-book.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { CustomGenreFormComponent } from './components/custom-genre-form/custom-genre-form.component';
import { BookInfoContainerComponent } from './containers/book-info-container/book-info-container.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddBookPageComponent } from './components/add-book-page/add-book-page.component';
import { FormService } from './services/book-form.service';
import { FormGuard } from './guards/form.guard';
import { FilterComponent } from './components/filter/filter.component';
import { MatSliderModule } from '@angular/material/slider';
import { FilterService } from './services/filter.service';
import { BooksResolverService } from './services/books-resolver.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { BooksViewComponent } from './views/books-view/books-view.component';
import { ImageFormComponent } from './components/image-form/image-form.component';




@NgModule({
  declarations: [
    BooksComponent,
    AddBookComponent,
    CustomGenreFormComponent,
    BookInfoContainerComponent,
    AddBookPageComponent,
    FilterComponent,
    BookListComponent,
    BookInfoComponent,
    BooksViewComponent,
    ImageFormComponent,

  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    CardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSliderModule,
  ],
  entryComponents: [ AddBookComponent, FilterComponent ],
  providers: [
    BooksResolverService,
    FormService,
    FormGuard,
    FilterService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue:
    {hasBackdrop: true, disableClose: true, closeOnNavigation: true}}
  ]
})
export class BooksModule { }
