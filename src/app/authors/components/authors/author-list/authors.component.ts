import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';

import { AuthorsService } from '../../../services/authors.service';
import { IAuthor } from '../../../interfaces/authors.interface';
import { AddAuthorComponent } from '../../add-author/add-author.component';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public authors$: Observable<IAuthor[]>;

  public destroy$ = new Subject<void>();

  public displayedColumns: string[] = ['first_name', 'last_name', 'additional_info'];

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this._loadAuthors();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showAddAuthorModal(): void {
    this._dialog.open(AddAuthorComponent);
  }

  private _loadAuthors(): void {
    this.authors$ = this._authorsService.getAuthors()
      .pipe(
        pluck('authors'),
      );
  }

}
