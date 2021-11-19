import { Observable } from 'rxjs';
import { IPaginationOptions } from './pagination-options-interface';

export interface ITableConfig {
  fetch: (options: IPaginationOptions) => Observable<{
    data: object[],
    total: number,
  }>;

  pagination?: boolean;
}
