import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { IAuthorsResponse } from '../../../authors/interfaces/authors-response.interface';
import { IAuthor } from '../../../authors/interfaces/authors.interface';
import { AuthorsService } from '../../../authors/services/authors.service';
import { IGenresResponse } from '../../../genres/interfaces/genres-response.interface';
import { IGenre } from '../../../genres/interfaces/genres.interface';
import { GenresService } from '../../../genres/services/genres.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  public nameOptions: IAuthor[];
  public genreOptions: IGenre[];

  public destroy$ = new Subject<void>();

  public filterForm: FormGroup;

  constructor(
    private readonly _filterService: FilterService,
    private readonly _authorsService: AuthorsService,
    private readonly _genreService: GenresService,
    private readonly _dialog: MatDialogRef<FilterComponent>,
  ) { }

  public ngOnInit(): void {
    this._loadFilterForm();
    this._loadAuthors();
    this._loadGenres();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public emitFiltration(): void {

    const control = this.filterForm?.controls;

    let queryParams = {
      author: control?.author?.value?.id,
      genre: control.genre.value,
      minPrice: control.price.get('minPrice').value,
      maxPrice: control.price.get('maxPrice').value,
    };

    for (let param in queryParams) {
      if ( !queryParams[param] ) {
        delete queryParams[param];
      }
    }

    this._dialog.close(queryParams);
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

  private _loadFilterForm(): void {
    this.filterForm = this._filterService.filterForm;
  }

}
