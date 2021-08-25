import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
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

  public nameFilteredOptions: Observable<string[]>;

  public genresFilteredOptions: Observable<string[]>;

  public nameOptions!: string[];

  public genresOptions!: string[];

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


  public ngOnInit() {

    this.authorsService.getAuthors()
      .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
        this.nameOptions = value.authors.reduce((result, current) => {
        result.push((`${current.first_name} ${current.last_name}`));
        //this.nameOptions = result;


        this.nameFilteredOptions = this.bookForm.get('name').valueChanges.pipe(
          startWith(''),
          map((value) => this._optionsFilter(this.nameOptions, value))
        );

        return result;
      }, []);
    });

    this.genresService.getGenres()
      .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
        value.genres.reduce((result, current) => {
        result.push(current.name);
        this.genresOptions = result;

        this.genresFilteredOptions = this.bookForm.get('genre').valueChanges.pipe(
          startWith(''),
          map((value) => this._optionsFilter(this.genresOptions, value))
        );

        return result;
      }, []);
    });

  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmit(): void {

    this.authorsService.getAuthors().subscribe(el => {
      const authorIdArray = el.authors.filter(data => {
        return data.first_name === this.bookForm.value.name.split(' ')[0];
      });

      this.genresService.getGenres().subscribe((genres) => {
        const genreIdArray = genres.genres.filter((data) => {
          return data.name === this.bookForm.value.genre;
        });

        this.bookService.addBook(this.bookForm.value, authorIdArray, genreIdArray);

      });

    });

  }

  private _optionsFilter(options, value) {
    const filterValue = value.toLowerCase();

    return options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
