import { Component, ContentChildren, Input, OnChanges, Output, QueryList, TemplateRef, EventEmitter } from '@angular/core';
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

  @Input()
  public length: number;

  @Output()
  public paginationSettings = new EventEmitter<any>();

  public pageSize: number;

  public pageSizeOptions = [3, 6, 9];

  @ContentChildren(MycellDirective, {descendants: true, read: TemplateRef})
  cells: QueryList<TemplateRef<MycellDirective>>;

  constructor() { }

  public setPagination(event: PageEvent): void {
    this.paginationSettings.emit(event);

  }

}
