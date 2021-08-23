import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  // public addBook(book: any): void {
  //   this.http.post('/api/authors', {
  //     description: book.description,
  //   }).toPromise();
  // }

}
