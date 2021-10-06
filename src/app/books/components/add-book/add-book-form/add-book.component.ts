import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { debounceTime, switchMap, takeUntil, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { AuthorsService } from '../../../../authors/services/authors.service';
import { GenresService } from '../../../../genres/services/genres.service';
import { BooksService } from '../../../services/books.service';
import { IBook } from '../../../interfaces/books.interface';
import { IGenre } from '../../../../genres/interfaces/genres.interface';
import { FormService } from '../../../services/form.service';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public bookForms: FormGroup;

  public genreValue: IGenre;

  public destroy$ = new Subject<void>();

  public nameOptions: Record<string, any>;

  public fetchGenres$!: any;

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
    private readonly bookService: BooksService,
    private readonly formService: FormService,
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
    this.bookForms = this.formService.loadForm();
    this.fetchGenres$ = this.fetchGenres();
    this._loadAuthors();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public fetchGenres(): (text: string) => Observable<Record<string, any>> {
    return (text: string) => {
      return this.genresService.getGenreByName(text)
        .pipe(
          map((response: Record<string, any>) => {
            return response.genres;
          })
        );
    };
  }

  public getGenreValue(event: string): void {
    this.genresService.getGenreByName(event)
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe((genreObject: Record<string, any>) => {
      this.genreValue = genreObject.genres;
    });
  }

  public onSubmit(): void {
    if (!this.bookForm.valid) {
      return;
    }

    const formValue = this.bookForm.value;
    const book: Partial<IBook> = {
      description: formValue.description,
      author_id: formValue.author.id,
      title: formValue.title,
      price: formValue.price,
      genres: formValue.genre,
    };

    this.bookService.addBook(book)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  public displayFn(author): string {
    return author
      ? `${author.first_name} ${author.last_name}`
      : '';
  }

  private _loadAuthors(): void {
    this.bookForm.get('author').valueChanges
    .pipe(
      debounceTime(500),
      switchMap((name) => {
        return this.authorsService.getAuthorByName(name);
      }),
      takeUntil(this.destroy$),
    )
    .subscribe((authorsObject: any) => {
      this.nameOptions = authorsObject.authors;
    });
  }

}
