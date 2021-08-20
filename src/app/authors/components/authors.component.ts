import { Component, OnInit } from '@angular/core';

import { AuthorsService } from '../services/authors.service';
import { IAuthors } from '../interfaces/authors.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  public authors: IAuthors[] = this.authorsService.getAuthors();

  public dataSource = this.authors;

  public displayedColumns: string[] = ['first_name', 'last_name'];

  constructor(
              private readonly authorsService: AuthorsService,
  ) { }

  ngOnInit() {
  }

}
