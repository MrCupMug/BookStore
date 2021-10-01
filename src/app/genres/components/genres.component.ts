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

  public flagControl = '';

  public destroy$ = new Subject<void>();

  public genres: IGenre[] = [];

  constructor(
    private readonly genresService: GenresService,
  ) { }

  public ngOnInit() {
    this._loadGenres();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public modelChange(change: any): void {
    console.log(change);
  }

  private _loadGenres(): void {
    this.genresService.getGenres()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.genres = data.genres;
      });
  }
}
