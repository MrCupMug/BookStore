import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { IAuthor } from '../../../authors/interfaces/authors.interface';
import { AuthorsService } from '../../../authors/services/authors.service';
import { IBook } from '../../../books/interfaces/books.interface';

@Component({
  selector: 'app-author-inf-container',
  templateUrl: './author-inf-container.component.html',
  styleUrls: ['./author-inf-container.component.scss']
})
export class AuthorInfContainerComponent implements OnInit {

  @Input()
  public author: IAuthor;

  public books$: Observable<IBook[]>;

  constructor(
    private readonly _authorsService: AuthorsService,
  ) { }

  public ngOnInit(): void {
    this._getBooks();
  }

  private _getBooks(): void {
    this.books$ = this._authorsService.getBookByAuthor(this.author.id)
      .pipe(
        pluck('books'),
      );
  }

}
