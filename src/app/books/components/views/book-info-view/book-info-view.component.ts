import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthor } from 'src/app/authors/interfaces/authors.interface';
import { IBook } from 'src/app/books/interfaces/books.interface';

@Component({
  selector: 'app-book-info-view',
  templateUrl: './book-info-view.component.html',
  styleUrls: ['./book-info-view.component.scss']
})
export class BookInfoViewComponent {

  @Input()
  public book: IBook;

  @Input()
  public author$: Observable<IAuthor>;

  @Output()
  public locationBack = new EventEmitter<void>();

  constructor() { }

  public goBack(): void {
    this.locationBack.emit();
  }

}
