import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IAuthors } from '../interfaces/authors.interface';
import { IAuthorsResponse } from '../interfaces/authors.response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

    private url = 'api/authors';

    public authors: Observable<IAuthorsResponse> = this.http.get<IAuthorsResponse>(this.url);

  constructor(
              private readonly http: HttpClient,
  ) { }

    public getAuthors(): Observable<IAuthorsResponse> {
        return this.authors;
    }

    public getAuthor(authorId: number): Observable<IAuthors> {
        return this.http.get<IAuthors>(`${this.url}/${authorId}`);
    }

}
