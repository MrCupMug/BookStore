import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { GenresService } from '../services/genres.service';
import { IGenre } from '../interfaces/genres.interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  public genres$: Observable<IGenre[]>;

  constructor(
    private readonly _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
    this._loadGenres();
  }

  private _loadGenres(): void {
    this.genres$ = this._genresService.getGenres()
      .pipe(
        pluck('genres'),
      );
  }
}
