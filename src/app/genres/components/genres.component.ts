import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GenresService } from '../services/genres.service';
import { IGenres } from '../interfaces/genres.interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit, OnDestroy {

  public destroy$: Subject<boolean> = new Subject();

  public genres: IGenres[] = [];

  constructor(
              private readonly genresService: GenresService,
  ) { }

  ngOnInit() {
    this._loadGenres();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private _loadGenres(): void {
    this.genresService.getGenres()
      .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.genres = data.genres;
        });
  }
}
