import { Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../classes/table';

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

  @Input()
  public headers: string[];

  @Input()
  public pageSize: number;

  @Input()
  public pageSizeOptions: number[];

  @Input()
  public currentPage: number;

  public data: Observable<object[]>;

  public total: Observable<number>;

  public tableClass: Table;

  @ContentChildren(MycellDirective, {descendants: true, read: TemplateRef})
  public cells: QueryList<TemplateRef<MycellDirective>>;

  constructor() {}

  public ngOnInit(): void {
    this.tableClass = new Table(this.config, this.pageSize);
    this.data = this.tableClass.fetchData();
    this.total = this.tableClass.fetchTotal();
  }

  public setPagination(options: IPaginationOptions): void {
    this.tableClass.setPagination(options);
  }

}
