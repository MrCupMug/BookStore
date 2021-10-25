import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthor } from '../../interfaces/authors.interface';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.scss']
})
export class AuthorViewComponent implements OnInit, OnDestroy {

  public author: IAuthor;

  public destroy$ = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._getAuthor();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _getAuthor(): void {
    this._activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((author) => {
        this.author = author.author;
      });
}

}
