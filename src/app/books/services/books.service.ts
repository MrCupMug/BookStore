import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IBook } from '../interfaces/books.interface';
import { IBooksResponse } from '../interfaces/books-response.interface';
import { Observable } from 'rxjs';
import { AuthorsService } from 'src/app/authors/services/authors.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public booksUrl = 'api/books';

  constructor(
    private readonly _http: HttpClient,
    private readonly _authorsService: AuthorsService,
  ) { }

  public getBooks(): Observable<IBooksResponse> {
    return this._http.get<IBooksResponse>(this.booksUrl);
  }

  public getBooksWithParams(queryParams: any): Observable<IBooksResponse> {

    if ( queryParams.author ) {
      return this._authorsService.getBookByAuthor(queryParams.author, queryParams);
    } else {
      const params = new HttpParams({
        fromObject: {
          'q[genres_name_cont]': queryParams.genre || '',
          'q[price_gteq]': queryParams.minPrice || '',
          'q[price_lteq]': queryParams.maxPrice || '',
          limit: queryParams.limit,
          page: queryParams.page
        }});

      return this._http.get<IBooksResponse>(this.booksUrl, {params});
    }
  }

  public getBookById(id: number): Observable<IBook> {
      return this._http.get<IBook>(`${this.booksUrl}/${id}`);
  }

  public addBook(book: Partial<IBook>): Observable<any> {
    return this._http.post(`/api/authors/${book.author_id}/books`, book);
  }

}
