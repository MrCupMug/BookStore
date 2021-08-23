import { Component, OnInit } from '@angular/core';

import { AuthorsService } from '../../services/authors.service';

import { IAuthors } from '../../interfaces/authors.interface';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {

  public formsAuthorsInfo: IAuthors = this.authorsService.formsAuthorInfo;

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public addAuthor(firstName: string, lastName: string) {
    this.authorsService.addAuthor(firstName, lastName);
  }

}
