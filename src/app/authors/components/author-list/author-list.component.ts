import { Component, Input, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { ITableConfig } from 'src/app/table/interfaces/config-interface';


@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListComponent implements OnChanges {

  @Input()
  public config: ITableConfig;

  @Input()
  public headers: string[];

  // @Input()
  // public authors: IAuthor[];

  @Output()
  public addBook = new EventEmitter<void>();

  // public displayedColumns: string[] = ['first_name', 'last_name', 'additional_info'];

  constructor() {}

  public ngOnChanges(): void {}

  public openDialog(): void {
    this.addBook.emit();
  }

}
