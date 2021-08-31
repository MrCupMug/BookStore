import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthorsService } from 'src/app/authors/services/authors.service';
import { GenresService } from 'src/app/genres/services/genres.service';
import { BooksService } from '../../../services/books.service';
import { IBook } from '../../../interfaces/books.interface';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public destroy$ = new Subject<void>();

  public nameOptions: Record<null, object[]>;
  // public genresOptions: Record<null, object[]>;

  public bookForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    price: [null, Validators.required],
    genre: [null, Validators.required],
    description: [null, Validators.required],
    author: [null, Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
    private readonly bookService: BooksService,
  ) { }

  public get titleControl(): AbstractControl {
    return this.bookForm.get('title');
  }

  public get authorControl(): AbstractControl {
    return this.bookForm.get('author');
  }

  public get priceControl(): AbstractControl {
    return this.bookForm.get('price');
  }

  // public get genreControl(): AbstractControl {
  //   return this.bookForm.get('genre');
  // }

  public get descriptionControl(): AbstractControl {
    return this.bookForm.get('description');
  }

  public ngOnInit() {
    this.bookForm.get('author').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((name) => {
          return this.authorsService.getAuthorByName(name);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((authorsObject: Record<string, object[]>) => {
        this.nameOptions = authorsObject.authors;
      });

    // this.bookForm.get('genre').valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     switchMap((genre) => {
    //       return this.genresService.getGenreByName(genre);
    //     }),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((genreObject: Record<string, object[]>) => {
    //     this.genresOptions = genreObject.genres;
    //   });

  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      genres: [],
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

}
