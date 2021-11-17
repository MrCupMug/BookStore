import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IPaginationOptions } from '../../interfaces/pagination-options-interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input()
  public total!: number;

  @Input()
  public pageSizeOptions: number[];

  @Output()
  public pagination = new EventEmitter<IPaginationOptions>();

  public currentPage = 1;

  public pageSize = 9;

  public pages: number;

  constructor() {}

  public ngOnChanges(): void {
    this.pages = Math.ceil(this.total / this.pageSize);
  }

  public goFirst(): void {
    this.currentPage = 1;
    this.setPagination();
  }

  public setSize(value: number): void {
    const currentPages = Math.ceil(this.total / value);
    if (this.currentPage > currentPages) {
      this.currentPage = currentPages;
    }
    this.pageSize = value;
    this.setPagination();
  }

  public nextPage(): void {
    this.currentPage++;
    this.setPagination();
  }

  public previousPage(): void {
    this.currentPage--;
    this.setPagination();
  }

  public firstPage(): void {
    this.currentPage = 1;
    this.setPagination();
  }

  public lastPage(): void {
    this.currentPage = this.pages;
    this.setPagination();
  }

  public setPagination(): void {

    this.pages = Math.ceil(this.total / this.pageSize);

    const options: IPaginationOptions = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    };

    this.pagination.emit(options);
  }

}
