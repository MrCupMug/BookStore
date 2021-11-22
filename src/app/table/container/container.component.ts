import { Component } from '@angular/core';
import { of } from 'rxjs';

import { ITableConfig } from '../interfaces/config-interface';
import { IPaginationOptions } from '../interfaces/pagination-options-interface';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  public headers = ['name', 'age'];

  public pageSize = 9;

  public pageSizeOptions = [3, 6, 9];

  public currentPage = 1;

  public dataArray = [{
    name: 'John',
    age: 24
  },
  {
    name: 'Alice',
    age: 27
  },
  {
    name: 'Gordon',
    age: 32
  },
  {
    name: 'Marshal',
    age: 53
  },
  {
    name: 'Lily',
    age: 52
  },
  {
    name: 'Ted',
    age: 48
  },
  {
    name: 'Robin',
    age: 37
  },
  {
    name: 'Barney',
    age: 69
  },
  {
    name: 'Sara',
    age: 19
  }];

  public config: ITableConfig = {
    fetch: (options: IPaginationOptions) => {
      const first = (options.pageIndex) * options.pageSize - options.pageSize;
      const last = (options.pageIndex) * options.pageSize;
      const response = {
        data: this.dataArray.slice(first, last),
        total: this.dataArray.length,
      };
      return of(response);
    }
  };

  constructor() { }

}
