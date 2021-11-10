import { Component } from '@angular/core';
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

  public readonly genres$: Observable<IGenre[]>;

  constructor(
    private readonly _genresService: GenresService,
  ) {
    this.genres$ = this._loadGenres();
  }

  private _loadGenres(): Observable<IGenre[]> {
    return this._genresService.getGenres()
      .pipe(
        pluck('genres'),
      );
  }

}
