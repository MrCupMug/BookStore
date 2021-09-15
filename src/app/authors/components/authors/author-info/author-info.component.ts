import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { IBook } from 'src/app/books/interfaces/books.interface';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.scss']
})
export class AuthorInfoComponent implements OnInit, OnDestroy {

  public author!: IAuthor;
  public books!: IBook[];

  public destroy$ = new Subject<void>();

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._getAuthor();
    this._getBooks();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _getAuthor() {
    this.route.data
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe((author) => {
      this.author = author.author;
    })
  }

  private _getBooks(): void {
    this.authorsService.getBookByAuthor(this.author.id)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((books) => {
        this.books = books['books'];
      });
  }

}
