import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGenres } from '../interfaces/genres.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  public genres: Observable<IGenres[]> = this.http.get<IGenres[]>('api/genres');

  constructor(
              private readonly http: HttpClient,
  ) { }

    public getGenres(): Observable<any> {
        return this.genres;
    }

}
