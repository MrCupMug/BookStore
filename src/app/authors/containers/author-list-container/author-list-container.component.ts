import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { AddAuthorComponent } from '../../components/add-author/add-author.component';

@Component({
  selector: 'app-authors',
  templateUrl: './author-list-container.component.html',
  styleUrls: ['./author-list-container.component.scss']
})
export class AuthorListContainerComponent implements OnInit {

  public authors$: Observable<IAuthor[]>;

  constructor(
    private readonly _dialogRef: MatDialog,
    private readonly _authorsService: AuthorsService,
  ) { }

  ngOnInit(): void {
    this._loadAuthors();
  }

  private _loadAuthors(): void {
    this.authors$ = this._authorsService.getAuthors()
      .pipe(
        pluck('authors'),
      );
  }

  public addBook(): void {
    this._dialogRef.open(AddAuthorComponent);
  }

}
