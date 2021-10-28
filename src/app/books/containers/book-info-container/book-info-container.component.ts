import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';

import { IAuthor } from '../../../authors/interfaces/authors.interface';
import { AuthorsService } from '../../../authors/services/authors.service';
import { IBook } from '../../interfaces/books.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-book-info-container',
  templateUrl: './book-info-container.component.html',
  styleUrls: ['./book-info-container.component.scss']
})
export class BookInfoContainerComponent implements OnInit, OnDestroy {

  @Input()
  public book: IBook;

  public author$: Observable<IAuthor>;

  public downloadedUrl$: Observable<string>;

  public destroy$ = new Subject<void>();

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _location: Location,
    private readonly _storage: AngularFireStorage,
  ) { }

  public ngOnInit(): void {
    this._getAuthor(this.book.author_id);
    this._loadImage();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goBack(): void {
    this._location.back();
  }

  private _getAuthor(id: number): void {
    this.author$ =  this._authorsService.getAuthor(id);
  }

  private _loadImage(): void {
    this._storage.ref('').listAll()
      .pipe(
        map((data) => {
          return data.items
            .find((el) => el.name === this.book.id.toString());
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.downloadedUrl$ = data?.name
          ? this._storage.ref(`/${this.book.id}`).getDownloadURL()
          : null;
      });
  }

}
