import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthorsService } from 'src/app/authors/services/authors.service';
import { GenresService } from 'src/app/genres/services/genres.service';
import { BooksService } from '../../services/books.service';
import { IBook } from '../../interfaces/books.interface';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public destroy$: Subject<boolean> = new Subject();

  public authorId: number;

  public nameOptions: object;
  public genresOptions: object;

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

  public ngOnInit() {
    this.bookForm.get('author').valueChanges
      .pipe(
        debounceTime(500),
        switchMap(name => {
          return this.authorsService.getAuthorByName(name);
        }),
        takeUntil(this.destroy$),
      ).subscribe(authorsObject => {
        this.nameOptions = authorsObject['authors'];
      });

    this.bookForm.get('genre').valueChanges
      .pipe(
        debounceTime(500),
        switchMap(genre => {
          return this.genresService.getGenreByName(genre);
        }),
        takeUntil(this.destroy$),
      ).subscribe(genreObject => {
        this.genresOptions = genreObject['genres'];
      });

  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmit(): void {
    const formValue = this.bookForm.value;
    const book: Partial<IBook> = {
      description: formValue.description,
      author_id: formValue.author.id,
      title: formValue.title,
      price: formValue.price,
      genres: [],
    };

    this.bookService.addBook(book)
      .pipe(takeUntil(this.destroy$))
        .subscribe();
  }

  public displayFn(author): string {
    return author ? `${author.first_name} ${author.last_name}` : '';
  }

}
