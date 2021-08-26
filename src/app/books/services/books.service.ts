import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBook } from '../interfaces/books.interface';
import { IBooksResponse } from '../interfaces/books.response.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public bookAdditionalInfo: any = new BehaviorSubject(null);

  constructor(
              private readonly http: HttpClient,
  ) { }

  public getBooks(): Observable<IBooksResponse> {
    return this.http.get<IBooksResponse>('api/books');
  }

  public getBookById(id: number): Observable<IBook> {
      return this.http.get<IBook>(`api/books/${id}`);
  }

  public addBook(book: IBook, authorId: number, genres: object): void {
    this.http.post(`/api/authors/${authorId}/books`, {
      description: book.description,
      author_id: authorId,
      title: book.title,
      price: book.price,
      genres,
    }).subscribe();
  }

}
