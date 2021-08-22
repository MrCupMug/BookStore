import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBooksCard } from '../interfaces/books.interface';
import { IBooksResponse } from '../interfaces/books.response.interface';
import { Observable } from 'rxjs';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public books: Observable<IBooksResponse> = this.http.get<IBooksResponse>('api/books');

  constructor(
              private readonly http: HttpClient,
  ) { }

  public getBooks(): Observable<IBooksResponse> {
    return this.books;
  }

  public getBookById(id: number): Observable<IBooksCard> {
      return this.http.get<IBooksCard>(`api/books/${id}`);
  }

  public addAuthor() {

    this.http.post('/api/authors', {
      first_name: 'tse',
      last_name: 'Test',
    }).toPromise();

  }

}
