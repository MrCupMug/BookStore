import { Observable } from 'rxjs';

export interface ITableConfig {
  fetch: (start: number, end: number) => Observable<{
    data: object[],
    total: number,
  }>;

  pagination?: boolean;
}
