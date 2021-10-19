import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IAuthor } from '../interfaces/authors.interface';
import { IAuthorsResponse } from '../interfaces/authors-response.interface';
import { Observable } from 'rxjs';
import { IBooksResponse } from '../../books/interfaces/books-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private authorUrl = 'api/authors';

  public formsAuthorInfo: IAuthor = {
    first_name: undefined,
    last_name: undefined,
  };

  constructor(
    private readonly _http: HttpClient,
  ) { }

    public getAuthors(): Observable<IAuthorsResponse> {
      return this._http.get<IAuthorsResponse>(this.authorUrl);
    }

    public getAuthor(authorId: number): Observable<IAuthor> {
      return this._http.get<IAuthor>(`${this.authorUrl}/${authorId}`);
    }

    public getAuthorByName(name: string): Observable<IAuthorsResponse> {
      const params = new HttpParams({
        fromObject: {
          'q[first_name_cont]': name,
        }
      });

      return this._http.get<IAuthorsResponse>(this.authorUrl, {params});
    }

    public getBookByAuthor(id: number, paginationParams?: any): Observable<IBooksResponse> {

      if (paginationParams) {
        const params = new HttpParams({
          fromObject: {
            limit: paginationParams.limit,
            page: paginationParams.page,
          },
        });

        return this._http.get<IBooksResponse>(`${this.authorUrl}/${id}/books`, {params});
      }

      return this._http.get<IBooksResponse>(`${this.authorUrl}/${id}/books`);
    }

    public addAuthor(firstName: string, lastName: string): Observable<object> {
      return this._http.post(this.authorUrl, {
        first_name: firstName,
        last_name: lastName,
      });
    }

}
