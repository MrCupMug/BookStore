import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { IGenre } from '../../../interfaces/genres.interface';
import { GenresService } from '../../../services/genres.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent {

  public readonly genres$: Observable<IGenre[]> = this._loadGenres();

  constructor(
    private readonly _genresService: GenresService,
  ) {}

  private _loadGenres(): Observable<IGenre[]> {
    return this._genresService.getGenres()
      .pipe(
        pluck('genres'),
      );
  }

}
