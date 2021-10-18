import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GenresService } from '../services/genres.service';
import { IGenre } from '../interfaces/genres.interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit, OnDestroy {

  public destroy$ = new Subject<void>();

  public genres: IGenre[] = [];

  constructor(
    private readonly _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
    this._loadGenres();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _loadGenres(): void {
    this._genresService.getGenres()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.genres = data.genres;
      });
  }
}
