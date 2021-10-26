import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { IAuthor } from '../../../authors/interfaces/authors.interface';
import { AuthorsService } from '../../../authors/services/authors.service';
import { IBook } from '../../interfaces/books.interface';


@Component({
  selector: 'app-book-info-container',
  templateUrl: './book-info-container.component.html',
  styleUrls: ['./book-info-container.component.scss']
})
export class BookInfoContainerComponent implements OnInit {

  @Input()
  public book: IBook;

  public author$: Observable<IAuthor>;

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _location: Location,
  ) { }

  public ngOnInit(): void {
    this._getAuthor(this.book.author_id);
  }

  public goBack(): void {
    this._location.back();
  }

  private _getAuthor(id: number): void {
    this.author$ =  this._authorsService.getAuthor(id);
  }

}
