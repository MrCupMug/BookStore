import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AuthorsService } from '../../services/authors.service';
import { IAuthors } from '../../interfaces/authors.interface';
import { AddAuthorComponent } from '../add-author/add-author.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public authors: IAuthors[] = [];

  public dataSource: IAuthors[] = this.authors;

  public displayedColumns: string[] = ['first_name', 'last_name'];

  private subscriptions: Array<any> = [];

  constructor(
              private readonly authorsService: AuthorsService,
              private readonly dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._loadAuthors();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public showAddAuthorModal(): void {
    this.dialog.open(AddAuthorComponent);
  }

  private _loadAuthors(): void {
    const request = this.authorsService.getAuthors()
      .subscribe((data) => {
        this.authors = data.authors;
        this.dataSource = this.authors;
      });

    this.subscriptions.push(request);
  }

}
