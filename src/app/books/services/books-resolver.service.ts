import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IBook } from '../interfaces/books.interface';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService implements Resolve<IBook> {

  constructor(
    private readonly booksService: BooksService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IBook | Observable<IBook> {
    const id = route.params.id;

    return this.booksService.getBookById(id);

  }

}
