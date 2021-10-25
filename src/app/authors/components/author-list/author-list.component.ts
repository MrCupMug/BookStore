import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { IAuthor } from '../../interfaces/authors.interface';


@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListComponent {

  @Input()
  public authors: IAuthor[];

  @Output()
  public addBook = new EventEmitter<void>();

  public displayedColumns: string[] = ['first_name', 'last_name', 'additional_info'];

  constructor() {}

  public openDialog(): void {
    this.addBook.emit();
  }

}
