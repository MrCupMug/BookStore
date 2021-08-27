import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBook } from '../interfaces/books.interface';
import { IBooksResponse } from '../interfaces/books.response.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public booksUrl = 'api/books';

  public bookAdditionalInfo: any = new BehaviorSubject(null);

  constructor(
              private readonly http: HttpClient,
  ) { }

  public getBooks(): Observable<IBooksResponse> {
    return this.http.get<IBooksResponse>(this.booksUrl);
  }

  public getBookById(id: number): Observable<IBook> {
      return this.http.get<IBook>(`${this.booksUrl}/${id}`);
  }

  public addBook(book: Partial<IBook>) {
    return this.http.post(`/api/authors/${book.author_id}/books`, book);
  }

}
