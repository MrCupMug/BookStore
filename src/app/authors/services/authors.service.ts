import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IAuthors } from '../interfaces/authors.interface';
import { IAuthorsResponse } from '../interfaces/authors.response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  public formsAuthorInfo: IAuthors = {
    first_name: undefined,
    last_name: undefined,
  };

  constructor(
              private readonly http: HttpClient,
  ) { }

    public getAuthors(): Observable<IAuthorsResponse> {
        return this.http.get<IAuthorsResponse>('api/authors');
    }

    public getAuthor(authorId: number): Observable<IAuthors> {
        return this.http.get<IAuthors>(`api/authors/${authorId}`);
    }


    public getAuthorByName(name: string) {

      return this.http.get(`/api/authors?q[first_name_cont]=${name}`);

    }

    public addAuthor(firstName: string, lastName: string): void {
      this.http.post('/api/authors', {
        first_name: firstName,
        last_name: lastName,
      }).subscribe();
    }

}
