import { Component, ContentChildren, Input, OnChanges, QueryList, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MycellDirective } from '../directives/mycell.directive';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {

  // TODO: Create an interface for config
  @Input()
  public config;

  public personList: Observable<any>;

  @ContentChildren(MycellDirective, {descendants: true, read: TemplateRef})
  cells: QueryList<TemplateRef<MycellDirective>>;

  constructor() { }

  public ngOnChanges(): void {
    this.personList =  this.config.fetch();
  }

}
