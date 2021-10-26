import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { IGenre } from '../../interfaces/genres.interface';
import { GenresService } from '../../services/genres.service';

@Component({
  selector: 'app-genre-list-container',
  templateUrl: './genre-list-container.component.html',
  styleUrls: ['./genre-list-container.component.scss']
})
export class GenreListContainerComponent {

  constructor(
    public readonly genres$: Observable<IGenre[]>,
    private readonly _genresService: GenresService,
  ) {
    genres$ = this._loadGenres();
  }

  private _loadGenres(): Observable<IGenre[]> {
    return this._genresService.getGenres()
      .pipe(
        pluck('genres'),
      );
  }

}
