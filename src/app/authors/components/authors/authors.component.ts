import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorsService } from '../../services/authors.service';
import { IAuthors } from '../../interfaces/authors.interface';
import { AddAuthorComponent } from '../add-author/add-author.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public destroy$: Subject<boolean> = new Subject<boolean>();

  public authors: IAuthors[] = [];

  public displayedColumns: string[] = ['first_name', 'last_name'];

  constructor(
              private readonly authorsService: AuthorsService,
              private readonly dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._loadAuthors();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public showAddAuthorModal(): void {
    this.dialog.open(AddAuthorComponent);
  }

  private _loadAuthors(): void {
    this.authorsService.getAuthors().pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.authors = data.authors;
      });
  }

}
