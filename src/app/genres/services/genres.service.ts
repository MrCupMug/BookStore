import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGenresResponse } from '../interfaces/genres-response.interface';


@Injectable({
  providedIn: 'root'
})
export class GenresService {

  public genresUrl = 'api/genres';

  constructor(
    private readonly _http: HttpClient,
  ) { }

    public getGenres(): Observable<IGenresResponse> {
      return this._http.get<IGenresResponse>(this.genresUrl);
    }

    public getGenreByName(name: string): Observable<IGenresResponse> {
      const params = new HttpParams({
        fromObject: {
          'q[name_cont]': name,
        }
      });

      return this._http.get<IGenresResponse>(this.genresUrl, {params});
    }

}
