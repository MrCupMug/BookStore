import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBooksCard } from '../interfaces/books.interface';
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

  public getBookById(id: number): Observable<IBooksCard> {
      return this.http.get<IBooksCard>(`api/books/${id}`);
  }

  public addBook(book: any, authorId: any, genres: any): void {

    alert(authorId);

    // this.http.post(`/api/authors/${authorId}/books`, {
    //   description: book.description,
    //   author_id: authorId,
    //   title: book.title,
    //   price: book.price,
    //   genres,
    // }).subscribe();
  }

}
