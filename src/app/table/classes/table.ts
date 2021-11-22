import { BehaviorSubject } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';
import { ITableConfig } from '../interfaces/config-interface';
import { IPaginationOptions } from '../interfaces/pagination-options-interface';
import { Pagination } from './pagination';

export class Table {

  public paginationClass: Pagination;

  public readonly paginationChange$ = new BehaviorSubject<IPaginationOptions>({pageIndex: 1, pageSize: 9});

  private config: ITableConfig;

  constructor(config: ITableConfig, pageSize: number) {
    this.config = config;
    this.paginationChange$.next({pageIndex: 1, pageSize});
  }

  public fetch() {
    return this.paginationChange$
      .pipe(
        switchMap((data) => this.config.fetch(data)),
        shareReplay(),
      );
  }

  public fetchData() {
    return this.fetch()
      .pipe(
        pluck('data')
      );
  }

  public fetchTotal() {
    return this.fetch()
      .pipe(
        pluck('total')
      );
  }

  public setPagination(options: IPaginationOptions): void {
    this.paginationChange$.next(options);
  }

}
