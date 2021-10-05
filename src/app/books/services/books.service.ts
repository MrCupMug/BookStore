import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IBook } from '../interfaces/books.interface';
import { IBooksResponse } from '../interfaces/books-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public booksUrl = 'api/books';

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getBooks(): Observable<IBooksResponse> {
    return this.http.get<IBooksResponse>(this.booksUrl);
  }

  public getBooksWithParams(limit: number, page: number): Observable<IBooksResponse> {
    const params = new HttpParams({
      fromObject: {
        limit: `${limit}`,
        page: `${page}`,
      }
    });

    return this.http.get<IBooksResponse>(this.booksUrl, {params});
  }

  public getBookById(id: number): Observable<IBook> {
      return this.http.get<IBook>(`${this.booksUrl}/${id}`);
  }

  public addBook(book: Partial<IBook>) {
    console.log(book);
    return this.http.post(`/api/authors/${book.author_id}/books`, book);
  }

}
