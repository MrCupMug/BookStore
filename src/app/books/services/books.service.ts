import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBooksCard } from '../interfaces/books.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public books: Observable<IBooksCard[]> = this.http.get<IBooksCard[]>('api/books');

  constructor(
              private readonly http: HttpClient,
  ) { }

  public getBooks(): Observable<any> {
    return this.books;
  }

  public getBookById(id: number): Observable<IBooksCard> {
      return this.http.get<IBooksCard>(`api/books/${id}`);
  }
}
