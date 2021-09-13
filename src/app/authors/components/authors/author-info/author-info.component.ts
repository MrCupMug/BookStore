import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IBook } from 'src/app/books/interfaces/books.interface';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.scss']
})
export class AuthorInfoComponent implements OnInit {

  public authorInformation: IAuthor;
  public books: IBook[];

  constructor(
    private readonly authorsService: AuthorsService,
  ) { }

  ngOnInit(): void {
    this.authorsService.getAuthorInformation().subscribe((author) => {
      this.authorInformation = author;
    });

    this.authorsService.getBookByAuthor(this.authorInformation).subscribe((books) => {
      this.books = books['books'];
    });
  }

}
