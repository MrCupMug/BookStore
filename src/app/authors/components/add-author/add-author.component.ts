import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorsService } from '../../services/authors.service';
import { IAuthor } from '../../interfaces/authors.interface';


@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit, OnDestroy {

  public destroy$ = new Subject<void>();

  public formsAuthorsInfo: IAuthor = this.authorsService.formsAuthorInfo;

  constructor(
    private readonly authorsService: AuthorsService,
  ) { }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addAuthor(firstName: string, lastName: string): void {
    this.authorsService.addAuthor(firstName, lastName)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

}
