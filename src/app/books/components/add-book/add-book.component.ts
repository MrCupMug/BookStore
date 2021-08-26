import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthorsService } from 'src/app/authors/services/authors.service';
import { GenresService } from 'src/app/genres/services/genres.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public destroy$: Subject<boolean> = new Subject();

  public nameOptions: string[];

  public genresOptions: string[];

  public bookForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    name: [null, Validators.required],
    price: [null, Validators.required],
    genre: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
    private readonly bookService: BooksService,
  ) { }


  public ngOnInit() { }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmit(): void {

    this.authorsService.getAuthorByName(this.bookForm.value.name.split(' ')[0])
      .subscribe(authorObject => {
        const authorId = authorObject['authors'][0].id;

        this.genresService.getGenreByName(this.bookForm.value.genre)
          .subscribe(genreObject => {
            const genres = genreObject['genres'][0];
            this.bookService.addBook(this.bookForm.value, authorId, genres);
        });
      });
  }

  public filterNameOptions(): void {
    setTimeout(() => {
      this.authorsService.getAuthorByName(this.bookForm.value.name)
        .pipe(takeUntil(this.destroy$))
          .subscribe(authorsObject => {
          this.nameOptions = authorsObject['authors'].map(data => {
            return `${data.first_name} ${data.last_name}`;
          });
        });
    }, 500);
  }

  public filterGenresOptions(): void {
    setTimeout(() => {
      this.genresService.getGenreByName(this.bookForm.value.genre).pipe(takeUntil(this.destroy$)).subscribe(genres => {
        this.genresOptions = genres['genres'].map(data => {
          return data.name;
        });
      });
    }, 500);
  }

}
