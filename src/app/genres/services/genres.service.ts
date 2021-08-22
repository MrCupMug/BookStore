import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGenres } from '../interfaces/genres.interface';
import { IGenresResponse } from '../interfaces/gebres.response.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  public genres: Observable<IGenresResponse> = this.http.get<IGenresResponse>('api/genres');

  constructor(
              private readonly http: HttpClient,
  ) { }

    public getGenres(): Observable<IGenresResponse> {
        return this.genres;
    }

}
