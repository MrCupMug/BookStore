import { Observable } from 'rxjs';

export interface ITableConfig {
  fetch(): Observable<object[]>;
}
