import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { MycellDirective } from '../../directives/mycell.directive';
import { ITableConfig } from '../../interfaces/config-interface';
import { IPaginationOptions } from '../../interfaces/pagination-options-interface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input()
  public config: ITableConfig;

  @Input()
  public headers: string[];

  public data: Observable<object[]>;

  public total: Observable<number>;

  public pageSize = 9;

  public pageSizeOptions = [3, 6, 9];

  @ContentChildren(MycellDirective, {descendants: true, read: TemplateRef})
  public cells: QueryList<TemplateRef<MycellDirective>>;

  private readonly paginationChange$ = new BehaviorSubject<IPaginationOptions>({pageIndex: 1, pageSize: 9});

  constructor() {
    const fetchData = this.paginationChange$
      .pipe(
        switchMap((data) => this.config.fetch(data)),
        shareReplay(),
      );

    this.data = fetchData
      .pipe(
        pluck('data')
      );

    this.total = fetchData
      .pipe(
        pluck('total')
      );
  }

  public setPagination(options: IPaginationOptions): void {
    // const first = (options.pageIndex) * options.pageSize - options.pageSize;
    // const last = (options.pageIndex) * options.pageSize;
    // this.paginationChange$.next({start: first, end: last});
    this.paginationChange$.next(options);
  }

}
