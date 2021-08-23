import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AuthorsService } from '../../services/authors.service';
import { IAuthors } from '../../interfaces/authors.interface';
import { AddAuthorComponent } from '../add-author/add-author.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  public authors: IAuthors[] = [];

  public dataSource = this.authors;

  public displayedColumns: string[] = ['first_name', 'last_name'];

  constructor(
              private readonly authorsService: AuthorsService,
              private readonly dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._loadAuthors();
  }

  public showAddAuthorModal(): void {
    this.dialog.open(AddAuthorComponent);
  }

  private _loadAuthors(): void {
    this.authorsService.getAuthors()
      .subscribe((data) => {
        this.authors = data.authors;
        this.dataSource = this.authors;
      });
  }

}
