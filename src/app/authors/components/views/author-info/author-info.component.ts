import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { IAuthor } from '../../../interfaces/authors.interface';
import { IBook } from '../../../../books/interfaces/books.interface';


@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorInfoComponent {

  @Input()
  public books$: Observable<IBook[]>;

  @Input()
  public author!: IAuthor;

  constructor() { }

}
