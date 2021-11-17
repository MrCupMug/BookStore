import { Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { MycellDirective } from '../../directives/mycell.directive';
import { ITableConfig } from '../../interfaces/config-interface';
import { IPaginationOptions } from '../../interfaces/pagination-options-interface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  public config: ITableConfig;

  public data: Observable<object[]>;

  public total: Observable<number>;

  public pageSize = 9;

  public pageSizeOptions = [3, 6, 9];

  @ContentChildren(MycellDirective, {descendants: true, read: TemplateRef})
  cells: QueryList<TemplateRef<MycellDirective>>;

  constructor() { }

  public ngOnInit(): void {
    this._loadData(0, this.pageSize);
  }

  public setPagination(options: IPaginationOptions): void {
    const first = (options.pageIndex) * options.pageSize - options.pageSize;
    const last = (options.pageIndex) * options.pageSize;
    this._loadData(first, last);
  }

  private _loadData(start: number, end: number): void {
    this.data = this.config.fetch(start, end)
      .pipe(
        pluck('data'),
      );

    this.total = this.config.fetch(start, end)
      .pipe(
        pluck('total'),
      );
  }


}
