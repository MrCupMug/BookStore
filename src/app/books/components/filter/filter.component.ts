import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { IAuthorsResponse } from 'src/app/authors/interfaces/authors-response.interface';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IGenresResponse } from 'src/app/genres/interfaces/genres-response.interface';
import { IGenre } from 'src/app/genres/interfaces/genres.interface';
import { GenresService } from 'src/app/genres/services/genres.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  public nameOptions: IAuthor[];
  public genreOptions: IGenre[];

  public destroy$ = new Subject<void>();

  public filterForm = this._fb.group({
    author: [null, Validators.required],
    genre: [null, Validators.required],
    price: this._fb.group({
      minPrice: [null, Validators.required],
      maxPrice: [null, Validators.required],
    }, {validators: this._priceValidator()})
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authorsService: AuthorsService,
    private readonly _genreService: GenresService,
    private readonly _dialog: MatDialogRef<FilterComponent>,
  ) { }

  public ngOnInit(): void {
    this._loadAuthors();
    this._loadGenres();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get minPrice(): AbstractControl {
    return this.filterForm?.get('minPrice');
  }

  public get maxPrice(): AbstractControl {
    return this.filterForm?.get('maxPrice');
  }

  public emitFiltration(): void {
    this._dialog.close(this.filterForm);
  }

  public displayFn(author): string {
    return author
      ? `${author.first_name} ${author.last_name}`
      : '';
  }

  private _loadGenres(): void {
    this.filterForm.get('genre').valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          return this._genreService.getGenreByName(value);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response: IGenresResponse) => {
        this.genreOptions = response.genres;
      });
  }

  private _loadAuthors(): void {
    this.filterForm.get('author').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((name) => {
          return this._authorsService.getAuthorByName(name);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((authorsObject: IAuthorsResponse) => {
        this.nameOptions = authorsObject.authors;
      });
  }

  private _priceValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {

      const minPrice = group.get('minPrice');
      const maxPrice = group.get('maxPrice');

      if (minPrice.value > maxPrice.value) {
        return {invalidPrice: 'invalid price filter',
                isValid: true};
      }

      return null;
    };
  }

}
