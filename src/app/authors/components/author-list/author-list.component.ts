import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ITableConfig } from 'src/app/table/interfaces/config-interface';


@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListComponent {

  @Input()
  public pageSize: number;

  @Input()
  public pageSizeOptions: number[];

  @Input()
  public config: ITableConfig;

  @Input()
  public headers: string[];

  @Input()
  public currentPage: number;

  @Output()
  public addBook = new EventEmitter<void>();

  constructor() {}

  public openDialog(): void {
    this.addBook.emit();
  }

}
