import { Component, forwardRef, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { IGenre } from 'src/app/genres/interfaces/genres.interface';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenreFormComponent),
      multi: true
    }
  ]
})
export class GenreFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  fetchFn!: (text: string) => Observable<IGenre[]>;

  public chips: string[] = [];

  public removable = true;

  private _val = [];

  public destroy$ = new Subject<void>();

  public genreForm: FormControl;
  public genreOptions: IGenre[];

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  public get genres() {
    return this.genreForm;
  }

  public set value(val) {
    if ( val !== undefined && this._val !== val) {
      this._val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  public ngOnInit() {
    this._initForm();
    this._listenGenresChange();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onChange: any = () => {};

  public onTouch: any = () => {};

  public writeValue(value: any) {
    this._val = value;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public addGenre(genreName: string) {
    if (this.chips.indexOf(genreName) !== -1) {
      return;
    }
    this.chips.push(genreName);
    this.value = this.chips;
    this.genreForm.reset();
  }

  public removeGenre(chip) {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.value = this.chips;
  }

  private _initForm(): void {
    this.genreForm = new FormControl(null, Validators.required);
  }

  private _listenGenresChange(): void {
    this.genres.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          return this.fetchFn(value);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((genres: IGenre[]) => {
        this.genreOptions = genres;
      });
  }

}
