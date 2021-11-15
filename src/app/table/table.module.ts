import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MycellDirective } from './directives/mycell.directive';
import { ContainerComponent } from './container/container.component';
import { TableRoutingModule } from './table-routing.module';
import { AgePipe } from './pipes/age.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [TableComponent, MycellDirective, ContainerComponent, AgePipe],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatPaginatorModule,
  ],
  exports: [
    TableComponent,
    MycellDirective,
  ]
})
export class TableModule { }