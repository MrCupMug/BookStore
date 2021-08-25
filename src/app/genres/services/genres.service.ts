import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGenresResponse } from '../interfaces/gebres.response.interface';

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

}
