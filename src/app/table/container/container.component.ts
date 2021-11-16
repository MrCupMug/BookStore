import { Component } from '@angular/core';
import { of } from 'rxjs';

import { ITableConfig } from '../interfaces/config-interface';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

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

  public config$ = {
    fetch: () => {
      return of([{
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
      }]);
    }
  };

  public config: ITableConfig = {
    // Start can be chabged to current page
    fetch: (start: number, end: number) => {
      const response = {
        data: this.dataArray.slice(start, end),
        total: this.dataArray.length,
      };
      return of(response);
    }
  };

  constructor() { }

}
