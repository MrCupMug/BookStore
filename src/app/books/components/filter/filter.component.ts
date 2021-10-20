import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { debounceTime, pluck, takeUntil } from 'rxjs/operators';

import { IAuthor } from '../../../authors/interfaces/authors.interface';
import { AuthorsService } from '../../../authors/services/authors.service';
import { IGenre } from '../../../genres/interfaces/genres.interface';
import { GenresService } from '../../../genres/services/genres.service';
import { FilterService } from '../../services/filter.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  public nameOptions$: Observable<IAuthor[]>;
  public genreOptions$: Observable<IGenre[]>;

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
      if (!queryParams[param]) {
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
        takeUntil(this.destroy$)
      )
      .subscribe((genre: string) => {
        this.genreOptions$ = this._genreService.getGenreByName(genre)
          .pipe(
            pluck('genres'),
          );
      })
  }

  private _loadAuthors(): void {
    this.filterForm.get('author').valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$),
      )
      .subscribe((name: string) => {
        this.nameOptions$ = this._authorsService.getAuthorByName(name)
          .pipe(
            pluck('authors'),
          );
      })
  }

  private _loadFilterForm(): void {
    this.filterForm = this._filterService.filterForm;
  }

}
