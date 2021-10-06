import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGenresResponse } from '../interfaces/genres-response.interface';
import { IGenre } from '../interfaces/genres.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
    private readonly http: HttpClient,
  ) { }

    public getGenres(): Observable<IGenresResponse> {
      return this.http.get<IGenresResponse>('api/genres');
    }

    public getGenreByName(name: string): Observable<IGenresResponse> {
      return this.http.get<IGenresResponse>(`api/genres?q[name_cont]=${name}`);
    }

}
