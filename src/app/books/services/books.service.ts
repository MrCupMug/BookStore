import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBooksCard } from '../interfaces/books.interface';
import { IBooksResponse } from '../interfaces/books.response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
              private readonly http: HttpClient,
  ) { }

  public getBooks(): Observable<IBooksResponse> {
    return this.http.get<IBooksResponse>('api/books');
  }

  public getBookById(id: number): Observable<IBooksCard> {
      return this.http.get<IBooksCard>(`api/books/${id}`);
  }

}
