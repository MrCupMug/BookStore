import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { IAuthor } from '../../../authors/interfaces/authors.interface';
import { AuthorsService } from '../../../authors/services/authors.service';
import { IBook } from '../../interfaces/books.interface';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-book-info-container',
  templateUrl: './book-info-container.component.html',
  styleUrls: ['./book-info-container.component.scss']
})
export class BookInfoContainerComponent implements OnInit {

  @Input()
  public book: IBook;

  public author$: Observable<IAuthor>;

  public downloadedUrl$: Observable<string>;

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _location: Location,
    private readonly _storage: AngularFireStorage,
  ) { }

  public ngOnInit(): void {
    this._getAuthor(this.book.author_id);
    this._loadImage();
  }

  public goBack(): void {
    this._location.back();
  }

  private _getAuthor(id: number): void {
    this.author$ =  this._authorsService.getAuthor(id);
  }

  private _loadImage(): void {
    this.downloadedUrl$ = this.book.id > 178
    ? this._storage.ref(`/${this.book.id}`).getDownloadURL()
    : this.downloadedUrl$ = null;
  }

}
