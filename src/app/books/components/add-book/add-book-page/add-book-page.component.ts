import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormService } from '../../../services/book-form.service';
import { AddBookComponent } from '../add-book-form/add-book.component';

@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.scss']
})
export class AddBookPageComponent implements OnInit, OnDestroy {

  public bookForm: FormGroup;

  public destroy$ = new Subject<void>();

  public dialog = this._dialogWindow;

  constructor(
    private readonly _dialogWindow: MatDialog,
    private readonly _router: Router,
    private readonly _formService: FormService,
  ) { }

  public get form(): FormGroup {
    return this.bookForm;
  }

  public ngOnInit(): void {
    this.bookForm = this._formService.loadForm();
    this.dialog.open(AddBookComponent);
    this._afterClose();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _afterClose(): void {
    this.dialog.afterAllClosed
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this._router.navigate(['../']);
      });
  }

}
