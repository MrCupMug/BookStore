import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

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
  public pagination = new EventEmitter<object>();

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

  public setSize(value: any): void {
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

    const options = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    };

    this.pagination.emit(options);
  }

}
