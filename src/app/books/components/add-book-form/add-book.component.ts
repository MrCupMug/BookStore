import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, map, pluck, tap } from 'rxjs/operators';

import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

import { AuthorsService } from '../../../authors/services/authors.service';
import { GenresService } from '../../../genres/services/genres.service';
import { BooksService } from '../../services/books.service';
import { IBook } from '../../interfaces/books.interface';
import { IGenre } from '../../../genres/interfaces/genres.interface';
import { FormService } from '../../services/book-form.service';
import { IGenresResponse } from '../../../genres/interfaces/genres-response.interface';
import { IAuthor } from '../../../authors/interfaces/authors.interface';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public bookForms: FormGroup;

  public destroy$ = new Subject<void>();

  public nameOptions$: Observable<IAuthor[]>;

  public fetchGenres$: Observable<IGenre[]>;

  private _ref: AngularFireStorageReference;

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _genresService: GenresService,
    private readonly _bookService: BooksService,
    private readonly _formService: FormService,
    private readonly _dialog: MatDialog,
    private readonly _storage: AngularFireStorage,
  ) { }

  public get bookForm(): FormGroup {
    return this.bookForms;
  }

  public get titleControl(): AbstractControl {
    return this.bookForm.get('title');
  }

  public get authorControl(): AbstractControl {
    return this.bookForm.get('author');
  }

  public get priceControl(): AbstractControl {
    return this.bookForm.get('price');
  }

  public get descriptionControl(): AbstractControl {
    return this.bookForm.get('description');
  }

  public get genreControl(): AbstractControl {
    return this.bookForm.get('genre');
  }

  public ngOnInit(): void {
    this.bookForms = this._formService.loadForm();
    this.fetchGenres$ = this.fetchGenres.bind(this);
    this._loadAuthors();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public fetchGenres(text: string): Observable<IGenre[]> {

    return this._genresService.getGenreByName(text)
      .pipe(
        map((response: IGenresResponse) => {

          return response.genres;
        })
      );

  }

  public onSubmit(): void {
    if (!this.bookForm.valid) {
      return;
    }

    const formValue = this.bookForm.value;
    const book: IBook = {
      description: formValue.description,
      author_id: formValue.author.id,
      title: formValue.title,
      price: formValue.price,
      genres: formValue.genre,
      image: formValue.image,
    };

    this._bookService.addBook(book)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data: IBook) => {
        this._uploadFile(data.id);
        this._dialog.closeAll();
      });
  }

  public displayFn(author): string {
    return author
      ? `${author.first_name} ${author.last_name}`
      : '';
  }

  private _uploadFile(bookId: number): void {
    const id = bookId.toString();
    const image = this.bookForm.get('image').value;
    this._ref = this._storage.ref(id);
    this._ref.put(image);
  }

  private _loadAuthors(): void {
    this.bookForm.get('author').valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$),
      )
      .subscribe((name: string) => {
        this.nameOptions$ = this._authorsService.getAuthorByName(name)
          .pipe(
            pluck('authors'),
          );
      });
  }

}
