import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IPaginationOptions } from 'src/app/table/interfaces/pagination-options-interface';
import { AddAuthorComponent } from '../../components/add-author/add-author.component';

@Component({
  selector: 'app-author-list-container',
  templateUrl: './author-list-container.component.html',
  styleUrls: ['./author-list-container.component.scss']
})
export class AuthorListContainerComponent {

  public headers = ['first name', 'last name', 'Additional info'];

  public pageSize = 10;

  public currentPage = 1;

  public pageSizeOptions = [5, 10, 15];

  public config = {
    fetch: this.getAuthors.bind(this),
  };

  public authors$: Observable<IAuthor[]>;

  constructor(
    private readonly _dialogRef: MatDialog,
    private readonly _authorsService: AuthorsService,
  ) { }

  public getAuthors(options: IPaginationOptions): Observable<{data: object[], total: number}> {
    return this._authorsService.getAuthors(options)
      .pipe(
        map((data) => {
          return {
            data: data.authors,
            total: data.meta.records,
          };
        })
      );
  }

  public addBook(): void {
    this._dialogRef.open(AddAuthorComponent);
  }

}
