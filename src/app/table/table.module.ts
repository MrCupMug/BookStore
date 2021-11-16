import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MycellDirective } from './directives/mycell.directive';
import { ContainerComponent } from './container/container.component';
import { TableRoutingModule } from './table-routing.module';
import { AgePipe } from './pipes/age.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [TableComponent, MycellDirective, ContainerComponent, AgePipe, PaginatorComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatSelectModule,
    MatButtonModule,
  ],
  exports: [
    TableComponent,
    MycellDirective,
  ]
})
export class TableModule { }
