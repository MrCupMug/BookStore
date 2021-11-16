import { Component, ContentChildren, Input, Output, QueryList, TemplateRef, EventEmitter, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MycellDirective } from '../../directives/mycell.directive';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input()
  public data;

  public pageSize = 9;

  public currentPage = 1;

  public pageSizeOptions = [3, 6, 9];

  @ContentChildren(MycellDirective, {descendants: true, read: TemplateRef})
  cells: QueryList<TemplateRef<MycellDirective>>;

  constructor() { }

  public setPagination(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
  }

}
