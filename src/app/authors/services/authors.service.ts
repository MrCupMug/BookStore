import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IAuthors } from '../interfaces/authors.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

    private url = 'api/authors';

    public authors: Observable<IAuthors[]> = this.http.get<IAuthors[]>(this.url);

  constructor(
              private readonly http: HttpClient,
  ) { }

    public getAuthors(): Observable<any> {
        return this.authors;
    }

    public getAuthor(authorId: number): Observable<IAuthors> {
        return this.http.get<IAuthors>(`${this.url}/${authorId}`);
    }

}
