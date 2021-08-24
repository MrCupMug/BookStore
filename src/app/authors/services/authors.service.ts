import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IAuthors } from '../interfaces/authors.interface';
import { IAuthorsResponse } from '../interfaces/authors.response.interface';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  public formsAuthorInfo: IAuthors = {
    first_name: undefined,
    last_name: undefined,
  };

    // public authors: Observable<IAuthorsResponse> = this.http.get<IAuthorsResponse>('api/authors');

  constructor(
              private readonly http: HttpClient,
  ) { }

    public getAuthors(): Observable<IAuthorsResponse> {
        return this.http.get<IAuthorsResponse>('api/authors');
    }

    public getAuthor(authorId: number): Observable<IAuthors> {
        return this.http.get<IAuthors>(`api/authors/${authorId}`);
    }

    public addAuthor(firstName: string, lastName: string): void {
      this.http.post('/api/authors', {
        first_name: firstName,
        last_name: lastName,
      }).toPromise();
    }

}
