import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IAuthor } from '../interfaces/authors.interface';
import { IAuthorsResponse } from '../interfaces/authors-response.interface';
import { Observable } from 'rxjs';
import { IBooksResponse } from 'src/app/books/interfaces/books-response.interface';

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
    private readonly http: HttpClient,
  ) { }

    public getAuthors(): Observable<IAuthorsResponse> {
      return this.http.get<IAuthorsResponse>(this.authorUrl);
    }

    public getAuthor(authorId: number): Observable<IAuthor> {
      return this.http.get<IAuthor>(`${this.authorUrl}/${authorId}`);
    }

    public getAuthorByName(name: string) {
      return this.http.get(`${this.authorUrl}?q[first_name_cont]=${name}`);
    }

    public getBookByAuthor(id: number, paginationParams?: any): Observable<IBooksResponse> {

      if (paginationParams) {
        const params = new HttpParams({
          fromObject: {
            limit: paginationParams.limit,
            page: paginationParams.page,
          },
        });

        return this.http.get<IBooksResponse>(`${this.authorUrl}/${id}/books`, {params});
      }

      return this.http.get<IBooksResponse>(`${this.authorUrl}/${id}/books`);
    }

    public addAuthor(firstName: string, lastName: string): Observable<object> {
      return this.http.post(this.authorUrl, {
        first_name: firstName,
        last_name: lastName,
      });
    }

}
